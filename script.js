// Variables
const header = document.querySelector('.header');
const navToggleIcon = document.querySelector('.nav-toggle-icon');
const navMenu = document.querySelector('.nav-menu');
const navLink = document.querySelectorAll('.nav-link');
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
        navLink.forEach(link => link.classList.remove('active-nav-link'));
        e.target.classList.add('active-nav-link');
    }
    if (e.target.classList.contains('external-link')) {
        const href = e.target.getAttribute('href');
        window.open(href, '_blank');
    }
    navMenu.classList.remove('toggle-nav-menu');
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