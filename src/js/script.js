import { portfolio } from "./portfolio.js";

// Variables
const container = document.querySelector('.container');
const navContainer = document.querySelector('.nav');
const navToggleIcon = document.querySelector('.nav-toggle-icon');
const hamburgerIcon = document.querySelector('.fa-bars');
const closeIcon = document.querySelector('.fa-times');
const navMenu = document.querySelector('.nav-menu');
const navLink = document.querySelectorAll('.nav-link');
const scrollTop = document.querySelector('.scroll-top');
const sectionOne = document.querySelector('.section-1');
const portfolioCardsContainer = document.querySelector('.portfolio-cards-container');
const portfolioMenu = document.querySelector('.portfolio-menu');
const portfolioItem = document.querySelectorAll('.portfolio-item');

// Functions
function toggleNavMenuIcon() {
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function toggleNavMenu() {
    toggleNavMenuIcon();
    navMenu.classList.toggle('toggle-nav-menu');
}

function closeNavMenu() {
    toggleNavMenuIcon();
    navMenu.classList.remove('toggle-nav-menu');
}

function removeActiveNavLink() {
    navLink.forEach(link => link.classList.remove('active-nav-link'));
}

function navMenuLinkActionANDCloseMenu(e) {
    e.preventDefault();
    if (e.target.classList.contains('logo')) {
        sectionOne.scrollIntoView();
        removeActiveNavLink();
        navLink[0].classList.add('active-nav-link');
        closeNavMenu();
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
    if (e.target.classList.contains('portfolio-item')) {
        const cards = document.querySelectorAll('.portfolio-card');
        const skillFilter = e.target.dataset.skill;

        portfolioItem.forEach(item => item.classList.remove('active-portfolio'));
        e.target.classList.add('active-portfolio');

        if (skillFilter === 'all') cards.forEach(card => {
            card.classList.remove('animation-show', 'animation-hide');
            setTimeout(() => {
                card.style.display = 'block';
                card.classList.add('animation-show');
            }, 250);
        });
        if (skillFilter !== 'all') cards.forEach(card => {
            const skills = card.textContent.toLowerCase();
            card.classList.remove('animation-show', 'animation-hide');
            if (skills.includes(skillFilter)) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.add('animation-show');
                }, 230);
            }
            if (!skills.includes(skillFilter)) {
                card.classList.add('animation-hide');
                setTimeout(() => card.style.display = 'none', 230);
            }
        });
    }
}

// On Load
renderPortfolioCards(portfolio);

// 0bserver
sectionOneObserver.observe(sectionOne);

// Event listeners
navToggleIcon.addEventListener('click', toggleNavMenu);
navContainer.addEventListener('click', navMenuLinkActionANDCloseMenu);
portfolioMenu.addEventListener('click', filterPortfolioCards);