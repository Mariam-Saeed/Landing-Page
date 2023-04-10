/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const mainSections = document.querySelectorAll('.main-section');
let navItems = '';
const navList = document.querySelector('.nav-list');

// hamburger menu icons
const openMenu = document.getElementById('open-icon');
const closeMenu = document.getElementById('close-icon');

const main = document.querySelector('.main-hero');
const scrollUpBtn = document.querySelector('.scroll-to-up');
const nav = document.querySelector('nav');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// scrollTo section function
const scrollTo = (section) => {
  section.scrollIntoView({ behavior: 'smooth' });
};

const calcId = (section) => section.id.at(-1);

const getLink = (section) => {
  return document.getElementById(`nav-${calcId(section)}`);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const bulidNav = () => {
  for (let section of mainSections) {
    const idNum = calcId(section);
    navItems += `<li><a class="nav-link" id="nav-${idNum}" href="#">${section.dataset.nav}</a></li>`;
  }
  navList.innerHTML = navItems;
};
bulidNav();

// Add class 'active' to section when near top of viewport
const addActive = (section) => {
  if (
    section.getBoundingClientRect().top <= 200 &&
    section.getBoundingClientRect().top >=
      -(section.getBoundingClientRect().height - 200)
  ) {
    section.classList.add('active-section');
    getLink(section).classList.add('active-nav-link');
  } else {
    section.classList.remove('active-section');
    getLink(section).classList.remove('active-nav-link');
  }
};

// Scroll to anchor ID
const scrollToSection = (link) => {
  const section = document.getElementById(`section${calcId(link)}`);
  scrollTo(section);
};

// toggle hamburger menu
const toggleMenu = () => {
  openMenu.classList.toggle('hide-icon');
  closeMenu.classList.toggle('show-icon');
  navList.classList.toggle('show-nav');
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
const navLinks = document.querySelectorAll('.nav-link');
for (let navLink of navLinks) {
  navLink.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToSection(navLink);
  });
}

// Set sections as active
for (let section of mainSections) {
  window.addEventListener('scroll', () => {
    addActive(section);
  });
}

// build humburger menu
openMenu.addEventListener('click', function () {
  toggleMenu();
});

closeMenu.addEventListener('click', function () {
  toggleMenu();
});

// scroll-to-up button
scrollUpBtn.addEventListener('click', function () {
  scrollTo(main);
});

// add navbar background, add scrollToTop button
window.addEventListener('scroll', function () {
  const mainChords = main.getBoundingClientRect();
  const navChords = nav.getBoundingClientRect();

  if (mainChords.top <= -(mainChords.height - navChords.height)) {
    scrollUpBtn.classList.add('show-scroll-btn');
    nav.style.background = 'black';
  } else if (mainChords.top > -(mainChords.height - navChords.height)) {
    scrollUpBtn.classList.remove('show-scroll-btn');
    nav.style.background = 'transparent';
  }
});
