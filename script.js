// Verificación en consola
console.log("Portafolio de Abel: JavaScript activo.");

/* =========================================================
   1. NAVBAR — cambia de color al hacer scroll
   ========================================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* =========================================================
   2. MENÚ MÓVIL (hamburguesa)
   ========================================================= */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cierra el menú al seleccionar un link (mejor UX en móvil)
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* =========================================================
   3. APARICIÓN GRADUAL DE SECCIONES AL HACER SCROLL
   ========================================================= */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* =========================================================
   4. RESALTADO DEL LINK ACTIVO SEGÚN LA SECCIÓN VISIBLE
   ========================================================= */
const sections = document.querySelectorAll('main section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeLinkObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach((link) => {
                    link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    },
    { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach((section) => activeLinkObserver.observe(section));

/* =========================================================
   5. EFECTO DE ESCRITURA (TYPING EFFECT) EN EL HERO
   ========================================================= */
const typingTarget = document.getElementById('typing-title');
const typingText = 'Frontend Developer | Software Engineering Student';

if (typingTarget) {
    let index = 0;

    function typeWriter() {
        if (index <= typingText.length) {
            typingTarget.textContent = typingText.slice(0, index);
            index++;
            setTimeout(typeWriter, 45);
        }
    }

    typeWriter();
}

/* =========================================================
   6. CONTADORES ANIMADOS (HERO STATS)
   ========================================================= */
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const duration = 900;
    const stepTime = Math.max(Math.floor(duration / target), 40);

    const timer = setInterval(() => {
        current += 1;
        el.textContent = current;
        if (current >= target) {
            clearInterval(timer);
        }
    }, stepTime);
}

const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.6 }
);

statNumbers.forEach((stat) => statsObserver.observe(stat));

/* =========================================================
   7. BOTÓN "BACK TO TOP"
   ========================================================= */
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =========================================================
   8. FILTRO DE PROYECTOS
   ========================================================= */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectItems.forEach((item) => {
            const matches = filter === 'all' || item.getAttribute('data-category') === filter;
            item.classList.toggle('hidden', !matches);
        });
    });
});
