import { events } from './events.js';

// Gallery Images
const images = [
  '/pictures/galerie-1.jpg',
  '/pictures/galerie-2.jpg',
  '/pictures/galerie-3.jpg',
  '/pictures/galerie-4.jpg',
  '/pictures/galerie-5.jpg'
];

// Carousel State
let currentImageIndex = 0;
let autoPlayActive = true;
let autoPlayTimer = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initNavigation();
  initHeaderScroll();
  initBurgerMenu();
  initEvents();
});

// ============== CAROUSEL ==============
function initCarousel() {
  createCarouselIndicators();
  startAutoPlay();
  
  // Button listeners
  document.getElementById('carousel-prev').addEventListener('click', () => {
    prevSlide();
  });
  
  document.getElementById('carousel-next').addEventListener('click', () => {
    nextSlide();
  });
}

function createCarouselIndicators() {
  const indicatorsContainer = document.getElementById('carousel-indicators');
  images.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.className = 'indicator' + (index === 0 ? ' indicator--active' : '');
    indicator.setAttribute('aria-label', `Bild ${index + 1}`);
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
    indicatorsContainer.appendChild(indicator);
  });
}

function updateCarousel() {
  const img = document.getElementById('carousel-image');
  img.src = images[currentImageIndex];
  
  // Update counter
  document.getElementById('carousel-counter').textContent = 
    `${currentImageIndex + 1} / ${images.length}`;
  
  // Update indicators
  document.querySelectorAll('.indicator').forEach((indicator, index) => {
    if (index === currentImageIndex) {
      indicator.classList.add('indicator--active');
    } else {
      indicator.classList.remove('indicator--active');
    }
  });
}

function nextSlide() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  autoPlayActive = false;
  stopAutoPlay();
  updateCarousel();
}

function prevSlide() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  autoPlayActive = false;
  stopAutoPlay();
  updateCarousel();
}

function goToSlide(index) {
  currentImageIndex = index;
  autoPlayActive = false;
  stopAutoPlay();
  updateCarousel();
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(() => {
    if (autoPlayActive) {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateCarousel();
    }
  }, 5000);
}

function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
}

// ============== NAVIGATION ==============
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = e.currentTarget.getAttribute('data-section');
      scrollToSection(sectionId);
      // Close burger menu after navigation
      closeBurgerMenu();
    });
  });
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeBurgerMenu() {
  const burgerMenu = document.getElementById('burger-menu');
  const headerNav = document.getElementById('header-nav');
  if (burgerMenu && headerNav) {
    burgerMenu.classList.remove('active');
    headerNav.classList.remove('active');
  }
}

// ============== HEADER SCROLL BEHAVIOR ==============
function initHeaderScroll() {
  let lastScrollY = 0;
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Show header when at top or scrolling up
    if (currentScrollY < 100 || currentScrollY < lastScrollY) {
      header.classList.add('header--visible');
      header.classList.remove('header--hidden');
    } 
    // Hide header when scrolling down
    else {
      header.classList.remove('header--visible');
      header.classList.add('header--hidden');
    }
    
    lastScrollY = currentScrollY;
  });
}

// ============== BURGER MENU ==============
function initBurgerMenu() {
  const burgerMenu = document.getElementById('burger-menu');
  const headerNav = document.getElementById('header-nav');
  
  if (!burgerMenu || !headerNav) return;
  
  // Toggle menu on burger click
  burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    burgerMenu.classList.toggle('active');
    headerNav.classList.toggle('active');
  });
  
  // Close menu when scrolling
  window.addEventListener('scroll', () => {
    burgerMenu.classList.remove('active');
    headerNav.classList.remove('active');
  });
}

// ============== EVENTS ==============
function initEvents() {
  const upcomingContainer = document.getElementById('events-upcoming');
  const pastContainer = document.getElementById('events-past');
  const pastTitle = document.getElementById('events-past-title');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = (event) => parseDate(event.end ?? event.start) < today;

  const upcoming = events
    .filter(event => !isPast(event))
    .sort((a, b) => parseDate(a.start) - parseDate(b.start));
  const past = events
    .filter(isPast)
    .sort((a, b) => parseDate(b.start) - parseDate(a.start));

  if (upcoming.length === 0) {
    upcomingContainer.appendChild(createElement('p', 'events-empty', 'Neue Termine folgen bald.'));
  }
  upcoming.forEach(event => upcomingContainer.appendChild(createEventCard(event)));

  pastTitle.hidden = past.length === 0;
  past.forEach(event => pastContainer.appendChild(createPastEventCard(event)));
}

function createEventCard(event) {
  const card = createElement('div', 'event-card');
  const detail = createElement('div', 'event-detail');
  detail.appendChild(createElement('h3', null, event.title));
  if (event.description) {
    detail.appendChild(createElement('p', 'event-description', event.description));
  }

  const info = createElement('div', 'event-info');
  [
    ['Date', formatDateRange(event)],
    ['Time', event.time],
    ['Location', event.location],
    ['Status', event.status]
  ].forEach(([label, value]) => {
    if (!value) return;
    const item = createElement('div', 'info-item');
    item.appendChild(createElement('span', 'label', label));
    item.appendChild(createElement('span', label === 'Status' ? 'value status-available' : 'value', value));
    info.appendChild(item);
  });

  detail.appendChild(info);
  card.appendChild(detail);
  return card;
}

function createPastEventCard(event) {
  const card = createElement('div', 'past-event');
  card.appendChild(createElement('span', 'past-event-date', formatDateRange(event)));
  card.appendChild(createElement('h4', null, event.title));
  card.appendChild(createElement('p', null, event.location));
  return card;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

// 'JJJJ-MM-TT' als lokales Datum (new Date('JJJJ-MM-TT') wäre UTC)
function parseDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDateRange(event) {
  const [startYear, startMonth, startDay] = event.start.split('-');
  if (!event.end) return `${startDay}.${startMonth}.${startYear}`;

  const [endYear, endMonth, endDay] = event.end.split('-');
  const startText = startYear === endYear
    ? `${startDay}.${startMonth}.`
    : `${startDay}.${startMonth}.${startYear}`;
  return `${startText} – ${endDay}.${endMonth}.${endYear}`;
}
