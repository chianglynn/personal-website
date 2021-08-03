import { portfolio } from "./portfolio.js";

// Variables
const header = document.querySelector('.header');
const navToggleIcon = document.querySelector('.nav-toggle-icon');
const navMenu = document.querySelector('.nav-menu');
const navLink = document.querySelectorAll('.nav-link');
const scrollTop = document.querySelector('.scroll-top');
const section2 = document.querySelector('.section-2');
const portfolioCardsContainer = document.querySelector('.portfolio-cards-container');
const portfolioMenu = document.querySelector('.portfolio-menu');
const portfolioItem = document.querySelectorAll('.portfolio-item');

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
        window.open(href, '_blank', 'noopener');
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

// Event listeners and observer
navToggleIcon.addEventListener('click', toggleNavMenu);
navMenu.addEventListener('click', navMenuLinkActionANDCloseMenu);
portfolioMenu.addEventListener('click', filterPortfolioCards);
section2Observer.observe(section2);