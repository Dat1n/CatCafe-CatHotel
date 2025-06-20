"use strict";

/**
 * PRELOAD
 *
 * Loading will end after document is loaded with a delay.
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  // Set a delay before adding the 'loaded' class
  setTimeout(function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  }, 1000);
});

/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navLinks = document.querySelectorAll(".navbar-link");

// Function to toggle the navbar
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

// Add click event to toggler buttons
addEventOnElements(navTogglers, "click", toggleNavbar);

// Close the navbar when a link is clicked
const closeNavbarOnClick = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
};

// Add click event to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", closeNavbarOnClick);
});

/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});

/**
 * AOS ANIMATION (Mobile Only)
 */
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth < 980;

  AOS.init({
    duration: 600,
    offset: 100,
    easing: "ease-in-out",
    once: false,
    disable: !isMobile, // disable AOS on non-mobile
  });

  // Scroll animation only if AOS is active (mobile only)
  if (isMobile) {
    function addScrollAnimation(
      selector,
      className = "in-view",
      threshold = 0.5
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(className);
            } else {
              entry.target.classList.remove(className);
            }
          });
        },
        { threshold }
      );

      document.querySelectorAll(selector).forEach((el) => {
        observer.observe(el);
      });
    }

    // These will animate only on mobile
    addScrollAnimation(".btn.glass-btn", "in-view", 0.3);
    addScrollAnimation(".hover-underline", "in-view", 0.5);
    addScrollAnimation(".service-card", "mobile-hover");
    addScrollAnimation(".hover\\:shine", "mobile-hover");
    addScrollAnimation(".feature-card", "mobile-hover");
    addScrollAnimation(".event-card", "mobile-hover");
  }
});
