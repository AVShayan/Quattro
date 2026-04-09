// Page load animations
let scrollY = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    //initHeadlightAnimation();
    initParallax();
    initSpecCards();
});

// Headlight animation sequence
function initHeadlightAnimation() {
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.getElementById('heroContent');
    const scrollIndicator = document.getElementById('scrollIndicator');

    // Turn on headlights after a brief delay
    setTimeout(() => {
        heroBackground.classList.add('loaded');
    }, 500);

    // Show content after headlights turn on
    setTimeout(() => {
        heroContent.classList.add('visible');
        scrollIndicator.classList.add('visible');
    }, 2000);
}

// Parallax scrolling effect
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        heroBackground.style.transform = `translateY(${scrollY * 0.5}px) scale(1.1)`;
    });
}

// Spec cards animation on scroll
function initSpecCards() {
    const specCards = document.querySelectorAll('.spec-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const cardIndex = card.getAttribute('data-index');
                setTimeout(() => {
                    card.classList.add('visible');
                }, cardIndex * 100);
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    specCards.forEach(card => {
        observer.observe(card);
    });
}

// Smooth scroll for links (if needed)
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});