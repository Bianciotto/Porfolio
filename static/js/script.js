const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function () {
        let scrollPos = window.scrollY || window.pageYOffset;
        let offset = 150;

        let currentSection = sections[0];
        for (let section of sections) {
            if (section.offsetTop - offset <= scrollPos) {
                currentSection = section;
            }
        }

        navLinks.forEach(link => link.classList.remove('active'));
        let activeLink = Array.from(navLinks).find(
            link => link.getAttribute('href') === `#${currentSection.id}`
        );
        if (activeLink) activeLink.classList.add('active');
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .course-card, .project-card, .skill-category, .cert-item, .stat-card'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const customSelect = document.getElementById('customSelect');
    const trigger = customSelect.querySelector('.custom-select-trigger');
    const options = customSelect.querySelectorAll('.custom-option');
    const hiddenInput = document.getElementById('subject');

    customSelect.addEventListener('click', function (e) {
        this.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            trigger.textContent = this.textContent;
            hiddenInput.value = this.getAttribute('data-value');
            customSelect.classList.remove('open');
        });
    });


    document.addEventListener('click', function (e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });

    customSelect.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            customSelect.classList.remove('open');
        }
    });
});

function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;

    contactForm.appendChild(successDiv);

    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

function showErrorMessage(message) {
    const existingMessage = document.querySelector('.error-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.style.cssText = `
        background: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    contactForm.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 16);
    });
}


const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats, .stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});


const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();

  
    clearFieldError(e);


    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }

    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Por favor, ingresa un email válido');
        return false;
    }

    return true;
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '';
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    `;
    errorElement.textContent = message;

    field.style.borderColor = '#ef4444';
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});


if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}


document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});



const courses = [
    {
        icon: '<i class="fas fa-graduation-cap"></i>',
        year: '2025',
        title: 'Tecnicatura Universitaria en Informática',
        institution: 'Universidad Nacional General Sarmiento',
        description: `La Tecnicatura Universitaria en Informática forma profesionales capaces de desarrollar
software o componentes de sistemas, colaborar en tareas de análisis, especificación,
diseño y testing, y participar activamente en todo el ciclo de vida del software.
La formación combina programación, bases de datos, ingeniería de software, sistemas
operativos y redes, junto con el desarrollo del pensamiento lógico y matemático
necesario para abordar problemas técnicos con precisión y criterio.`,
        technologies: ['Python', 'Java', 'SQL', 'Agile']
    },
    {
        icon: '<i class="fas fa-language"></i>',
        year: '2025',
        title: 'Inglés Nivel 4 (equivalente a Nivel 2.1 del MCER)',
        institution: 'Universidad Nacional Jose C. Paz',
        description: `Curso centrado en el desarrollo de habilidades de comprensión lectora, auditiva y
expresión escrita en inglés, correspondiente al nivel A2+ del Marco Común Europeo de
Referencia para las Lenguas (MCER). Se abordaron estructuras gramaticales y vocabulario
de nivel básico-intermedio, con foco en situaciones cotidianas y textos académicos.`,
        technologies: ['Writing', 'Speaking', 'Listening', 'Technical Reading']
    },
    {
        icon: '<i class="fas fa-code"></i>',
        year: '2023',
        title: 'Desarrollo Web Front-End',
        institution: 'Talento Tech',
        description: `Capacitación en Desarrollo Front-End.
Formación introductoria en desarrollo web, donde apliqué conocimientos básicos de HTML,
CSS y JavaScript. También trabajamos con Bootstrap para construir interfaces modernas y
adaptables, enfocándonos en buenas prácticas y estructura del código.`,
        technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap']
    },
    {
        icon: '<i class="fas fa-vial"></i>',
        year: '2022',
        title: 'Curso de QA Manual',
        institution: 'Argentina Programa 4.0',
        description: `Capacitación en conceptos básicos de aseguramiento de calidad, con énfasis en testing
exploratorio y testing manual. Incluyó la elaboración de planes de testing para
garantizar la cobertura y calidad del software. Las pruebas se aplicaron en una página
web diseñada específicamente para detectar fallos, errores y anomalías. Además, se
utilizó Postman para la administración y seguimiento de las tareas de prueba.`,
        technologies: ['Testing Manual', 'Testing Exploratorio', 'Plan de Prueba', 'PostMan']
    },
    {
        icon: '<i class="fas fa-gamepad"></i>',
        year: '2022',
        title: 'Introducción al Desarrollo de Videojuegos con Godot',
        institution: 'Universidad Nacional Jose C. Paz',
        description: `Capacitación enfocada en el desarrollo de videojuegos utilizando el motor Godot. Apliqué
lógica de programación orientada a objetos, diagramas de flujo y el lenguaje GDScript.
Como proyecto final, desarrollamos un juego tipo spaceship shooter, el cual fue
publicado en la plataforma Itch.io.`,
        technologies: ['GDScript', 'Python', 'Godot', 'UML']
    },
    {
        icon: '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/120px-Salesforce.com_logo.svg.png" alt="Salesforce Logo" width="30">',
        year: 'Actual',
        title: 'Capacitación en Desarrollo Salesforce, TrailHead',
        institution: 'Ruta: "Conozca en detalle las herramientas y conceptos de desarrollo de Salesforce"',
        description: `Actualmente estoy realizando una ruta de aprendizaje en Trailhead donde profundizo en
las herramientas y conceptos clave para el desarrollo en Salesforce. En esta formación,
estudio los fundamentos de Apex, la utilización de la interfaz de desarrollo y el manejo
de la API de Salesforce, enfocándome en la construcción y personalización de
aplicaciones en la plataforma.`,
        technologies: ['Apex', 'Trigger', 'Developer Console', 'SOQL-SOSL']
    }
];


function renderCourses() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return; 
    grid.innerHTML = courses.map(course => `
    <div class="course-card">
      <div class="course-header">
        <div class="course-icon">${course.icon}</div>
        <div class="course-year">${course.year}</div>
      </div>
      <h3>${course.title}</h3>
      <p class="course-institution">${course.institution}</p>
      <p class="course-description">${course.description}</p>
      <div class="course-technologies">
        ${course.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

const skills = [
    {
        category: "Lenguajes de Programación",
        items: [
            { img: "static/img/Python.svg", alt: "Lenguaje Python", name: "Python" },
            { img: "static/img/Java.svg", alt: "Lenguaje Java", name: "Java" },
            { img: "static/img/Html5.svg", alt: "Lenguaje HTML5", name: "HTML5" },
            { img: "static/img/Css3.svg", alt: "Lenguaje CSS3", name: "CSS3" },
            { img: "static/img/Javascript.svg", alt: "Lenguaje JavaScript", name: "JavaScript" },
            { img: "static/img/icon_C.svg", alt: "Lenguaje C", name: "C" },
            { img: "static/img/icon_Csharp.svg", alt: "Lenguaje C#", name: "C#" },
            { img: "static/img/icon_Assembly.svg", alt: "Lenguaje Assembly", name: "Assembly" }
        ]
    },
    {
        category: "Bases de Datos",
        items: [
            { img: "static/img/Sql.svg", alt: "Lenguaje SQL", name: "SQL" },
            { img: "static/img/icon_Mysql.svg", alt: "Tecnología MySQL", name: "MySQL" },
            { img: "static/img/icon_Postgresql.svg", alt: "Tecnología PostgreSQL", name: "PostgreSQL" },
            { img: "static/img/Sqlite.svg", alt: "Tecnología SQLite", name: "SQLite" },
            { img: "static/img/DockerWordmark.svg", alt: "Tecnología Docker", name: "Docker" },
            { img: "static/img/FileTypeExcel.svg", alt: "Tecnología Excel", name: "Excel" },
            { img: "static/img/Sqlalchemy.svg", alt: "Tecnología SQLAlchemy", name: "SQLAlchemy" }
        ]
    },
    {
        category: "Otras Tecnología y Herramientas",
        items: [
            { img: "static/img/icon_Selenium.svg", alt: "Tecnología Selenium", name: "Selenium" },
            { img: "static/img/icon_Junit.svg", alt: "Tecnología JUnit", name: "JUnit" },
            { img: "static/img/Pytest.svg", alt: "Tecnología Pytest", name: "Pytest" },
            { img: "static/img/Postman.svg", alt: "Herramienta Postman", name: "Postman" },
            { img: "static/img/Trello.svg", alt: "Herramienta Trello", name: "Trello" },
            { img: "static/img/Jira.svg", alt: "Herramienta Jira", name: "Jira" }
        ]
    }
];

function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = skills.map(cat => `
    <div class="skill-category">
      <h3>${cat.category}</h3>
      <div class="skill-items">
        ${cat.items.map(skill => `
          <div class="skill-item">
            <img src="${skill.img}" alt="${skill.alt}" class="skill-img">
            <span>${skill.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderCourses && renderCourses();
});
document.addEventListener('DOMContentLoaded', function () {
    const card = document.getElementById('availability-card');
    const toggle = document.getElementById('availability-toggle');
    if (card && toggle) {
        function toggleCard() {
            card.classList.toggle('collapsed');
            toggle.blur();
        }
        toggle.addEventListener('click', toggleCard);
        toggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleCard();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    scrollBtn.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const msg = document.querySelector('.success-message');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
                        if (response.ok) {
                form.reset();
                showSuccessMessage('¡Mensaje enviado correctamente!');
            } else {
                showErrorMessage('Ocurrió un error al enviar el mensaje.');
            }
        });
    }
});