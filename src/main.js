// Gallery Images
const images = [
  '/pictures/Sketch-Aquarium__high-1-scaled-1600x900.jpg',
  '/pictures/teamLab-Borderless-IMG_1926-1536x1024.jpg',
  '/pictures/Screenshot 2025-12-07 115125.png',
  '/pictures/Screenshot 2025-12-07 115436.png',
  '/pictures/Screenshot 2025-12-07 120059.png'
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
      const sectionId = e.target.getAttribute('data-section');
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
