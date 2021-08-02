// Variables
const header = document.querySelector('.header');
const navToggleIcon = document.querySelector('.nav-toggle-icon');
const navMenu = document.querySelector('.nav-menu');
const scrollTop = document.querySelector('.scroll-top');
const section2 = document.querySelector('.section-2');

// Functions
function toggleNavMenu() {
    navMenu.classList.toggle('toggle-nav-menu');
}

function navMenuLinkActionANDCloseMenu(e) {
    e.preventDefault();
    if (e.target.classList.contains('nav-link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView();
        navMenu.classList.remove('toggle-nav-menu');
    }
}

function showScrollTop(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) scrollTop.classList.remove('show-scroll-top');
    else scrollTop.classList.add('show-scroll-top');
}

const section2Observer = new IntersectionObserver(showScrollTop, {
    root: null,
    threshold: 0,
});

// Event listeners and observer
navToggleIcon.addEventListener('click', toggleNavMenu);
navMenu.addEventListener('click', navMenuLinkActionANDCloseMenu);
section2Observer.observe(section2);