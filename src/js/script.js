import { portfolio } from "./portfolio.js";

// Variables
const navContainer = document.querySelector('.nav');
const navToggleIcon = document.querySelector('.nav-toggle-icon');
const hamburgerIcon = document.querySelector('.fa-bars');
const closeIcon = document.querySelector('.fa-times');
const navMenu = document.querySelector('.nav-menu');
const navLink = document.querySelectorAll('.nav-link');
const overlay = document.querySelector('.overlay');
const scrollTop = document.querySelector('.scroll-top');
const sectionOne = document.querySelector('.section-1');
const portfolioCardsContainer = document.querySelector('.portfolio-cards-container');
const portfolioMenu = document.querySelector('.portfolio-menu');
const portfolioList = document.querySelector('.portfolio-list')

// Functions
function toggleNavMenuIcon() {
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function toggleNavMenu() {
    toggleNavMenuIcon();
    navMenu.classList.toggle('toggle-nav-menu');
    overlay.classList.toggle('hidden');
}

function closeNavMenu() {
    toggleNavMenuIcon();
    navMenu.classList.remove('toggle-nav-menu');
    overlay.classList.add('hidden');
}

function removeActiveNavLink() {
    navLink.forEach(link => link.classList.remove('active-nav-link'));
}

function goToSectionOne() {
    sectionOne.scrollIntoView();
    removeActiveNavLink();
    navLink[0].classList.add('active-nav-link');
    if (navMenu.classList.contains('toggle-nav-menu')) closeNavMenu();
}

function navMenuLinkActionANDCloseMenu(e) {
    e.preventDefault();
    if (e.target.classList.contains('logo')) {
        goToSectionOne();
        if (navMenu.classList.contains('toggle-nav-menu')) closeNavMenu();
    }
    if (e.target.classList.contains('nav-link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView();
        removeActiveNavLink();
        e.target.classList.add('active-nav-link');
        closeNavMenu();
    }
    if (e.target.classList.contains('external-link')) {
        const href = e.target.getAttribute('href');
        window.open(href, '_blank', 'noopener');
        closeNavMenu();
    }
}

function showScrollTop(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) scrollTop.classList.remove('show-scroll-top');
    else scrollTop.classList.add('show-scroll-top');
}

const sectionOneObserver = new IntersectionObserver(showScrollTop, {
    root: null,
    threshold: 0,
});

function renderPortfolioCategories(portfolio) {
    const categories = ['All', ...new Set(portfolio.map(project => project.category))];
    const markup = categories.map(category => `<li class="portfolio-item" data-category="${category}">${category}</li>`).join('');
    portfolioList.insertAdjacentHTML('afterbegin', markup);
    portfolioList.querySelector('[data-category="All"]').classList.add('active-portfolio');
}

function renderPortfolioCards(portfolio) {
    const markup = portfolio.map(project => {
        return `
            <div class="portfolio-card">
                <img class="portfolio-image"
                    src="${project.image}"
                    alt="${project.title}">
                <div class="portfolio-information">
                    <p class="portfolio-skill">${project.skills.join(' / ')}</p>
                    <h3>${project.title}</h3>
                    <div class="portfolio-links-container">
                        <a class="portfolio-link github-link"
                            href="${project.github}"
                            target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a class="portfolio-link demo-link"
                            href="${project.demo}"
                            target="_blank" rel="noopener noreferrer">Demo</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    portfolioCardsContainer.insertAdjacentHTML('afterbegin', markup);
}

function filterPortfolioCards(e) {
    const portfolioItem = document.querySelectorAll('.portfolio-item');

    if (e.target.classList.contains('portfolio-item')) {
        const cards = document.querySelectorAll('.portfolio-card');
        const categoryFilter = e.target.dataset.category.toLowerCase();

        portfolioItem.forEach(item => item.classList.remove('active-portfolio'));
        e.target.classList.add('active-portfolio');

        if (categoryFilter === 'all') cards.forEach(card => {
            card.classList.remove('animation-show', 'animation-hide');
            setTimeout(() => {
                card.style.display = 'block';
                card.classList.add('animation-show');
            }, 250);
        });
        if (categoryFilter !== 'all') cards.forEach(card => {
            const category = card.querySelector('.portfolio-skill').textContent.toLowerCase();
            card.classList.remove('animation-show', 'animation-hide');
            if (category.includes(categoryFilter)) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.add('animation-show');
                }, 230);
            }
            if (!category.includes(categoryFilter)) {
                card.classList.add('animation-hide');
                setTimeout(() => card.style.display = 'none', 230);
            }
        });
    }
}

// On Load
renderPortfolioCategories(portfolio);
renderPortfolioCards(portfolio);

// 0bserver
sectionOneObserver.observe(sectionOne);

// Event listeners
navToggleIcon.addEventListener('click', toggleNavMenu);
navContainer.addEventListener('click', navMenuLinkActionANDCloseMenu);
overlay.addEventListener('click', closeNavMenu);
scrollTop.addEventListener('click', goToSectionOne);
portfolioMenu.addEventListener('click', filterPortfolioCards);