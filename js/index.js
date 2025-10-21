function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 100);
}

function handleParallax() {
    document.querySelectorAll('.hero').forEach(element => {
        const speed = 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}

function handleScrollEffects() {
    handleHeaderScroll();
    handleParallax();
    updateActiveNav();
    toggleScrollButton();
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(handleScrollEffects);
});

function observerSetup() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function animateRatings() {
    document.querySelectorAll('.rating-text').forEach(element => {
        const text = element.textContent;
        const rating = parseFloat(text);
        if (!isNaN(rating)) {
            let current = 0;
            const increment = rating / 50;
            const interval = setInterval(() => {
                current += increment;
                if (current >= rating) {
                    current = rating;
                    clearInterval(interval);
                }
                element.textContent = current.toFixed(1) + text.substring(text.indexOf(' '));
            }, 30);
        }
    });
}

function animateRatingsDelayed() {
    window.addEventListener('load', () => setTimeout(animateRatings, 1000));
}

function createParticles(advanced = true) {
    const container = document.getElementById('particles');
    if (!container) return;

    container.innerHTML = '';
    const count = advanced ? 60 : 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        Object.assign(particle.style, {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: size + 'px',
            height: size + 'px',
            opacity: Math.random() * 0.6 + 0.2,
            animationDelay: Math.random() * 10 + 's',
            animationDuration: (Math.random() * 6 + 4) + 's'
        });

        container.appendChild(particle);
    }
}

setInterval(() => createParticles(true), 30000);

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
}

function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.id = 'scrollTopBtn';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow);
    `;
    document.body.appendChild(scrollButton);

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function toggleScrollButton() {
    const button = document.getElementById('scrollTopBtn');
    if (!button) return;
    button.style.opacity = window.scrollY > 500 ? '1' : '0';
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupFormValidation() {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove('input-error', 'input-warning');
            if (input.type === "email" && input.value && !validarEmail(input.value)) {
                input.classList.add('input-error');
            } else if (input.type === "password" && input.value && input.value.length < 6) {
                input.classList.add('input-warning');
            }
        });
    });
}

function handleContatoForm() {
    const contatoForm = document.querySelector(".contact-form");
    if (!contatoForm) return;

    contatoForm.addEventListener("submit", e => {
        e.preventDefault();
        const nome = document.getElementById("nomeContato").value.trim();
        const email = document.getElementById("emailContato").value.trim();
        const mensagem = document.getElementById("mensagemContato").value.trim();

        if (!nome || !email || !mensagem) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        if (!validarEmail(email)) {
            alert("Por favor, insira um email válido!");
            return;
        }

        const button = contatoForm.querySelector('button');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        button.disabled = true;

        setTimeout(() => {
            alert(`Obrigado ${nome}! Sua mensagem foi enviada com sucesso.`);
            contatoForm.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    });
}

function setupCardsAndButtons() {
    const hoverElements = document.querySelectorAll('.card, .freelancer-card, .btn, .btn-card, .btn-login');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => el.classList.add('hover-up'));
        el.addEventListener('mouseleave', () => el.classList.remove('hover-up'));
    });
}

function setupHamburgerMenu() {
    const menuToggle = document.getElementById('menu-toggle-links');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles(true);
    setupCardsAndButtons();
    setupFormValidation();
    handleContatoForm();
    smoothScroll();
    addScrollToTop();
    observerSetup();
    animateRatingsDelayed();
    setupHamburgerMenu();
});

const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary) !important;
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
    .hover-up {
        transform: translateY(-8px) scale(1.02);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
