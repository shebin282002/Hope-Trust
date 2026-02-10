// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ============================================
// GALLERY FILTER FUNCTIONALITY
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ============================================
// GALLERY MODAL IMAGE
// ============================================
const galleryButtons = document.querySelectorAll('.gallery-btn');
const modalImage = document.getElementById('modalImage');

galleryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-img');
        modalImage.src = imgSrc;
    });
});

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Event listeners for carousel controls
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
}

// Dots click functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-play on hover
const testimonialSection = document.querySelector('.testimonials-carousel');
if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact-section');
if (impactSection) {
    counterObserver.observe(impactSection);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Simulate form submission
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'form-message error';
        }
    });
}

// ============================================
// NEWSLETTER FORM
// ============================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// ============================================
// ANIMATION ON SCROLL (AOS)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll('.mission-card, .gallery-item, .info-item, .about-content');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// MOBILE MENU CLOSE ON LINK CLICK
// ============================================
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navbarToggler.click();
        }
    });
});

// ============================================
// PREVENT DEFAULT LINK BEHAVIOR FOR DEMO
// ============================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================
const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ============================================
// CONSOLE LOG FOR DEVELOPMENT
// ============================================
console.log('%c Purpose Impact NGO Website ', 'background: #0B1C2D; color: #C9A24D; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Website loaded successfully! ', 'background: #C9A24D; color: #0B1C2D; padding: 5px 10px; font-size: 12px;');
console.log('Transparency • Trust • Impact');

// ============================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active testimonial
    showTestimonial(0);
    
    // Initialize navbar state
    updateActiveNavLink();
    
    // Add smooth transitions to gallery items
    galleryItems.forEach((item, index) => {
        item.style.transition = 'all 0.3s ease';
        item.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // Initialize Dark Mode
    initializeDarkMode();
    
    // Initialize Language
    initializeLanguage();
    
    console.log('All features initialized successfully!');
});

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check if user has saved preference
    const savedMode = localStorage.getItem('darkMode');
    
    // Set initial theme based on saved preference or system preference
    if (savedMode === 'true') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    } else if (savedMode !== 'false' && prefersDarkScheme.matches) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
    
    updateDarkModeIcon();
    
    // Toggle dark mode on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.documentElement.classList.toggle('dark-mode');
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode.toString());
            updateDarkModeIcon();
            console.log('Dark mode toggled:', isDarkMode);
        });
    }
    
    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === null) {
            if (e.matches) {
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
            } else {
                document.documentElement.classList.remove('dark-mode');
                document.body.classList.remove('dark-mode');
            }
            updateDarkModeIcon();
        }
    });
    
    console.log('Dark mode initialized');
}

function updateDarkModeIcon() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        darkModeToggle.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
}

// ============================================
// MULTI-LANGUAGE TRANSLATION FUNCTIONALITY
// ============================================
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.mission': 'Mission',
        'nav.gallery': 'Gallery',
        'nav.testimonials': 'Testimonials',
        'nav.impact': 'Impact',
        'nav.contact': 'Contact',
        'hero.title': 'Building Impact Through<br>Purpose & Transparency',
        'hero.subtitle': 'We support communities and initiatives that create long-term social value through structured programs and ethical practices.',
        'about.title': 'Who We Are',
        'mission.title': 'Our Mission',
        'gallery.title': 'Our Gallery',
        'gallery.subtitle': 'Moments that define our journey',
        'testimonials.title': 'What People Say',
        'impact.title': 'Our Impact',
        'impact.subtitle': 'Numbers that reflect our commitment',
        'impact.stat1': 'Families Supported',
        'impact.stat2': 'Active Volunteers',
        'impact.stat3': 'Ongoing Projects',
        'impact.stat4': 'Years of Service',
        'contact.title': 'Get In Touch',
        'hero.cta.support': 'Support Our Mission',
        'hero.cta.learn': 'Learn More',
        'about.p1': 'We are a purpose-driven organization committed to empowering communities through education, healthcare, and sustainable development initiatives.',
        'about.p2': 'Our approach focuses on transparency, accountability, and long-term impact. Every project we undertake is designed with the community\'s needs at the forefront, ensuring sustainable growth and meaningful change.',
        'about.feature1': 'Transparent Operations',
        'about.feature2': 'Community-Focused Approach',
        'about.feature3': 'Sustainable Solutions',
        'mission.card1.title': 'Education Support',
        'mission.card1.desc': 'Creating access to quality education for underprivileged children through scholarships, learning materials, and mentorship programs.',
        'mission.card1.link': 'Learn More',
        'mission.card2.title': 'Healthcare Initiatives',
        'mission.card2.desc': 'Supporting health programs for better community well-being through medical camps, awareness programs, and healthcare access.',
        'mission.card2.link': 'Learn More',
        'mission.card3.title': 'Community Development',
        'mission.card3.desc': 'Building sustainable solutions for long-term social growth through skill development and empowerment programs.',
        'mission.card3.link': 'Learn More',
        'gallery.item1.title': 'Education Program',
        'gallery.item1.desc': 'Empowering young minds',
        'gallery.item2.title': 'Healthcare Camp',
        'gallery.item2.desc': 'Community wellness initiative',
        'gallery.item3.title': 'Community Support',
        'gallery.item3.desc': 'Building together',
        'gallery.item4.title': 'Women Empowerment',
        'gallery.item4.desc': 'Empowering and educating women',
        'gallery.item5.title': 'Disaster Management',
        'gallery.item5.desc': 'Rescuing and helping people from natural disasters',
        'gallery.item6.title': 'Volunteer Work',
        'gallery.item6.desc': 'Hands that help',
        'cta.title': 'Together, We Can Create\nMeaningful Change',
        'cta.text': 'Your support helps us continue making a difference in communities worldwide',
        'cta.button': 'Donate Now',
        'donate.title': 'Support Our Mission',
        'donate.subtitle': 'Your generosity helps us create lasting change',
        'donate.scan': 'Scan with any UPI app',
        'donate.why': 'Why Your Support Matters',
        'donate.benefit1': 'Direct impact on communities we serve',
        'donate.benefit2': '100% transparent use of funds',
        'donate.benefit3': 'Tax-deductible donations (with receipt)',
        'donate.gateway': '💡 <strong>Coming Soon:</strong> Online payment gateway will be added for credit/debit card donations',
        'donate.close': 'Close',
        'donate.share': 'Share QR Code',
        'contact.subtitle': "Have questions or want to collaborate? We'd love to hear from you.",
        'contact.address.label': 'Address',
        'contact.phone.label': 'Phone',
        'contact.email.label': 'Email',
        'contact.hours.label': 'Working Hours',
        'footer.title': 'Purpose Impact',
        'footer.text': 'Committed to creating meaningful change through transparency, accountability, and community-focused initiatives.',
        'footer.bottom': '© 2026 Purpose Impact Organization | Transparency • Trust • Impact',
        'footer.heading.quicklinks': 'Quick Links',
        'footer.links.home': 'Home',
        'footer.links.about': 'About Us',
        'footer.links.mission': 'Our Mission',
        'footer.links.gallery': 'Gallery',
        'footer.heading.programs': 'Our Programs',
        'footer.links.education': 'Education Support',
        'footer.links.healthcare': 'Healthcare',
        'footer.links.community': 'Community Dev',
        'footer.links.volunteer': 'Volunteer',
        'footer.heading.newsletter': 'Newsletter',
        'footer.newsletter.text': 'Subscribe to get updates on our work',
        'footer.credits': 'All Rights Reserved',
        'gallery.filter.all': 'All',
        'gallery.filter.education': 'Education',
        'gallery.filter.healthcare': 'Healthcare',
        'gallery.filter.community': 'Community',
        'gallery.filter.events': 'Events',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Your Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Your Message',
        'contact.form.send': 'Send Message',
        'testimonials.1.text': '"This organization has transformed our community. The education program gave my children opportunities I never thought possible. Their transparent approach and genuine care make all the difference."',
        'testimonials.1.name': 'Sarah Johnson',
        'testimonials.1.role': 'Parent & Community Member',
        'testimonials.2.text': '"Volunteering with this NGO has been incredibly rewarding. Their structured programs and focus on sustainable impact show real results. I\'m proud to be part of this mission."',
        'testimonials.2.name': 'Michael Chen',
        'testimonials.2.role': 'Volunteer Coordinator',
        'testimonials.3.text': '"The healthcare initiatives provided by this organization saved lives in our village. Their commitment to transparency and regular follow-ups ensure lasting impact. Truly exceptional work."',
        'testimonials.3.name': 'Priya Sharma',
        'testimonials.3.role': 'Healthcare Beneficiary'
    },
    es: {
        'nav.home': 'Inicio',
        'nav.about': 'Acerca de',
        'nav.mission': 'Misión',
        'nav.gallery': 'Galería',
        'nav.testimonials': 'Testimonios',
        'nav.impact': 'Impacto',
        'nav.contact': 'Contacto',
        'hero.title': 'Construyendo Impacto a través de<br>Propósito y Transparencia',
        'hero.subtitle': 'Apoyamos comunidades e iniciativas que crean valor social a largo plazo a través de programas estructurados y prácticas éticas.',
        'about.title': 'Quiénes Somos',
        'mission.title': 'Nuestra Misión',
        'gallery.title': 'Nuestra Galería',
        'gallery.subtitle': 'Momentos que definen nuestro viaje',
        'testimonials.title': 'Lo Que Dicen',
        'impact.title': 'Nuestro Impacto',
        'impact.subtitle': 'Números que reflejan nuestro compromiso',
        'impact.stat1': 'Familias Apoyadas',
        'impact.stat2': 'Voluntarios Activos',
        'impact.stat3': 'Proyectos en Curso',
        'impact.stat4': 'Años de Servicio',
        'contact.title': 'Contáctenos',
        'hero.cta.support': 'Apoya Nuestra Misión',
        'hero.cta.learn': 'Aprende Más',
        'about.p1': 'Somos una organización orientada al propósito comprometida con el empoderamiento de las comunidades a través de la educación, la salud y el desarrollo sostenible.',
        'about.p2': 'Nuestro enfoque se centra en la transparencia, la responsabilidad y el impacto a largo plazo. Cada proyecto que emprendemos se diseña con las necesidades de la comunidad en primer plano, garantizando un crecimiento sostenible y un cambio significativo.',
        'about.feature1': 'Operaciones Transparentes',
        'about.feature2': 'Enfoque Centrado en la Comunidad',
        'about.feature3': 'Soluciones Sostenibles',
        'mission.card1.title': 'Apoyo Educativo',
        'mission.card1.desc': 'Crear acceso a una educación de calidad para niños desfavorecidos mediante becas, materiales de aprendizaje y programas de mentoría.',
        'mission.card1.link': 'Aprende Más',
        'mission.card2.title': 'Iniciativas de Salud',
        'mission.card2.desc': 'Apoyar programas de salud para un mejor bienestar comunitario mediante campamentos médicos, programas de concienciación y acceso a la atención.',
        'mission.card2.link': 'Aprende Más',
        'mission.card3.title': 'Desarrollo Comunitario',
        'mission.card3.desc': 'Construir soluciones sostenibles para el crecimiento social a largo plazo mediante el desarrollo de habilidades y programas de empoderamiento.',
        'mission.card3.link': 'Aprende Más',
        'gallery.item1.title': 'Programa Educativo',
        'gallery.item1.desc': 'Empoderando a las mentes jóvenes',
        'gallery.item2.title': 'Campamento de Salud',
        'gallery.item2.desc': 'Iniciativa de bienestar comunitario',
        'gallery.item3.title': 'Apoyo Comunitario',
        'gallery.item3.desc': 'Construyendo juntos',
        'gallery.item4.title': 'Empoderamiento de la Mujer',
        'gallery.item4.desc': 'Empoderar y educar a las mujeres',
        'gallery.item5.title': 'Gestión de Desastres',
        'gallery.item5.desc': 'Rescate y ayuda a personas en desastres naturales',
        'gallery.item6.title': 'Trabajo Voluntario',
        'gallery.item6.desc': 'Manos que ayudan',
        'cta.title': 'Juntos, Podemos Crear\nCambio Significativo',
        'cta.text': 'Tu apoyo nos ayuda a continuar marcando la diferencia en comunidades de todo el mundo',
        'cta.button': 'Donar Ahora',
        'donate.title': 'Apoya Nuestra Misión',
        'donate.subtitle': 'Tu generosidad nos ayuda a crear un cambio duradero',
        'donate.scan': 'Escanea con cualquier aplicación UPI',
        'donate.why': 'Por Qué Tu Apoyo Es Importante',
        'donate.benefit1': 'Impacto directo en las comunidades que servimos',
        'donate.benefit2': 'Uso 100% transparente de fondos',
        'donate.benefit3': 'Donaciones deducibles de impuestos (con recibo)',
        'donate.gateway': '💡 <strong>Próximamente:</strong> Se agregará una pasarela de pago en línea para donaciones con tarjeta de crédito/débito',
        'donate.close': 'Cerrar',
        'donate.share': 'Compartir Código QR',
        'contact.subtitle': '¿Tienes preguntas o quieres colaborar? Nos encantaría saber de ti.',
        'contact.address.label': 'Dirección',
        'contact.phone.label': 'Teléfono',
        'contact.email.label': 'Correo electrónico',
        'contact.hours.label': 'Horario de Atención',
        'footer.title': 'Purpose Impact',
        'footer.text': 'Comprometidos a crear un cambio significativo mediante la transparencia, la responsabilidad y las iniciativas centradas en la comunidad.',
        'footer.bottom': '© 2026 Purpose Impact Organization | Transparencia • Confianza • Impacto',
        'footer.heading.quicklinks': 'Enlaces Rápidos',
        'footer.links.home': 'Inicio',
        'footer.links.about': 'Acerca de Nosotros',
        'footer.links.mission': 'Nuestra Misión',
        'footer.links.gallery': 'Galería',
        'footer.heading.programs': 'Nuestros Programas',
        'footer.links.education': 'Apoyo Educativo',
        'footer.links.healthcare': 'Salud',
        'footer.links.community': 'Desarrollo Comunitario',
        'footer.links.volunteer': 'Voluntariado',
        'footer.heading.newsletter': 'Boletín',
        'footer.newsletter.text': 'Suscríbete para recibir actualizaciones sobre nuestro trabajo',
        'footer.credits': 'Todos los Derechos Reservados',
        'gallery.filter.all': 'Todo',
        'gallery.filter.education': 'Educación',
        'gallery.filter.healthcare': 'Salud',
        'gallery.filter.community': 'Comunidad',
        'gallery.filter.events': 'Eventos',
        'contact.form.name': 'Tu Nombre',
        'contact.form.email': 'Tu Correo Electrónico',
        'contact.form.subject': 'Asunto',
        'contact.form.message': 'Tu Mensaje',
        'contact.form.send': 'Enviar Mensaje',
        'testimonials.1.text': '"Esta organización ha transformado nuestra comunidad. El programa de educación dio a mis hijos oportunidades que nunca pensé posibles. Su enfoque transparente y su cuidado genuino marcan la diferencia."',
        'testimonials.1.name': 'Sarah Johnson',
        'testimonials.1.role': 'Padre y miembro de la comunidad',
        'testimonials.2.text': '"Ser voluntario en esta ONG ha sido increíblemente gratificante. Sus programas estructurados y su enfoque en un impacto sostenible muestran resultados reales. Estoy orgulloso de formar parte de esta misión."',
        'testimonials.2.name': 'Michael Chen',
        'testimonials.2.role': 'Coordinador de Voluntarios',
        'testimonials.3.text': '"Las iniciativas de salud proporcionadas por esta organización salvaron vidas en nuestra aldea. Su compromiso con la transparencia y los seguimientos regulares aseguran un impacto duradero. Trabajo verdaderamente excepcional."',
        'testimonials.3.name': 'Priya Sharma',
        'testimonials.3.role': 'Beneficiario de Salud'
    },
    hi: {
        'nav.home': 'होम',
        'nav.about': 'हमारे बारे में',
        'nav.mission': 'मिशन',
        'nav.gallery': 'गैलरी',
        'nav.testimonials': 'प्रशंसापत्र',
        'nav.impact': 'प्रभाव',
        'nav.contact': 'संपर्क करें',
        'hero.title': 'उद्देश्य और पारदर्शिता के माध्यम से<br>प्रभाव बनाना',
        'hero.subtitle': 'हम समुदायों और पहलों का समर्थन करते हैं जो संरचित कार्यक्रमों और नैतिक प्रथाओं के माध्यम से दीर्घकालिक सामाजिक मूल्य बनाते हैं।',
        'about.title': 'हम कौन हैं',
        'impact.subtitle': 'संख्याएं जो हमारी प्रतिबद्धता को दर्शाती हैं',
        'impact.stat1': 'समर्थित परिवार',
        'impact.stat2': 'सक्रिय स्वयंसेवक',
        'impact.stat3': 'चल रहे प्रकल्प',
        'impact.stat4': 'सेवा के वर्ष',
        'mission.title': 'हमारा मिशन',
        'gallery.title': 'हमारी गैलरी',
        'gallery.subtitle': 'हमारी यात्रा को परिभाषित करने वाले क्षण',
        'testimonials.title': 'लोग क्या कहते हैं',
        'impact.title': 'हमारा प्रभाव',
        'contact.title': 'हमसे संपर्क करें',
        'hero.cta.support': 'हमारे मिशन का समर्थन करें',
        'hero.cta.learn': 'और जानें',
        'about.p1': 'हम एक उद्देश्य-संचालित संगठन हैं जो शिक्षा, स्वास्थ्य और सतत विकास पहलों के माध्यम से समुदायों को सशक्त बनाने के लिए प्रतिबद्ध है।',
        'about.p2': 'हमारा दृष्टिकोण पारदर्शिता, जवाबदेही और दीर्घकालिक प्रभाव पर केंद्रित है। हर परियोजना को समुदाय की आवश्यकताओं को ध्यान में रखकर डिज़ाइन किया जाता है, जिससे स्थायी विकास और सार्थक परिवर्तन सुनिश्चित होता है।',
        'about.feature1': 'पारदर्शी संचालन',
        'about.feature2': 'समुदाय-केंद्रित दृष्टिकोण',
        'about.feature3': 'सतत समाधान',
        'mission.card1.title': 'शैक्षिक समर्थन',
        'mission.card1.desc': 'छात्रवृत्ति, अध्ययन सामग्री और मेंटरशिप कार्यक्रमों के माध्यम से वंचित बच्चों के लिए गुणवत्तापूर्ण शिक्षा तक पहुंच बनाना।',
        'mission.card1.link': 'और जानें',
        'mission.card2.title': 'स्वास्थ्य पहलों',
        'mission.card2.desc': 'मेडिकल कैंप, जागरूकता कार्यक्रम और स्वास्थ्य सेवाओं के माध्यम से बेहतर सामुदायिक कल्याण का समर्थन।',
        'mission.card2.link': 'और जानें',
        'mission.card3.title': 'समुदाय विकास',
        'mission.card3.desc': 'कुशलता विकास और सशक्तिकरण कार्यक्रमों के माध्यम से दीर्घकालिक सामाजिक विकास के लिए स्थायी समाधान बनाना।',
        'mission.card3.link': 'और जानें',
        'gallery.item1.title': 'शैक्षिक कार्यक्रम',
        'gallery.item1.desc': 'युवा मन को सशक्त बनाना',
        'gallery.item2.title': 'स्वास्थ्य शिविर',
        'gallery.item2.desc': 'समुदाय कल्याण पहल',
        'gallery.item3.title': 'समुदाय समर्थन',
        'gallery.item3.desc': 'साथ मिलकर निर्माण',
        'gallery.item4.title': 'महिला सशक्तिकरण',
        'gallery.item4.desc': 'महिलाओं को सशक्त और शिक्षित करना',
        'gallery.item5.title': 'आपदा प्रबंधन',
        'gallery.item5.desc': 'प्राकृतिक आपदाओं से लोगों को बचाना और मदद करना',
        'gallery.item6.title': 'स्वयंसेवी कार्य',
        'gallery.item6.desc': 'मदद करने वाले हाथ',
        'cta.title': 'एक साथ, हम बना सकते हैं\nसार्थक परिवर्तन',
        'cta.text': 'आपका समर्थन हमें दुनियाभर में समुदायों में फर्क करते रहने में मदद करता है',
        'cta.button': 'अब दान करें',
        'donate.title': 'हमारे मिशन का समर्थन करें',
        'donate.subtitle': 'आपकी उदारता हमें स्थायी परिवर्तन बनाने में मदद करती है',
        'donate.scan': 'किसी भी यूपीआई ऐप के साथ स्कैन करें',
        'donate.why': 'आपका समर्थन क्यों महत्वपूर्ण है',
        'donate.benefit1': 'हम जिन समुदायों की सेवा करते हैं उन पर सीधा प्रभाव',
        'donate.benefit2': 'धन का 100% पारदर्शी उपयोग',
        'donate.benefit3': 'कर-कटौती योग्य दान (रसीद के साथ)',
        'donate.gateway': '💡 <strong>जल्द आ रहा है:</strong> क्रेडिट/डेबिट कार्ड दान के लिए ऑनलाइन पेमेंट गेटवे जोड़ा जाएगा',
        'donate.close': 'बंद करें',
        'donate.share': 'क्यूआर कोड साझा करें',
        'contact.subtitle': 'क्या आपके पास प्रश्न हैं या आप सहयोग करना चाहते हैं? हमें आपकी प्रतिक्रिया पसंद आएगी।',
        'contact.address.label': 'पता',
        'contact.phone.label': 'फोन',
        'contact.email.label': 'ईमेल',
        'contact.hours.label': 'कार्य समय',
        'footer.title': 'Purpose Impact',
        'footer.text': 'पारदर्शिता, जवाबदेही और समुदाय-केंद्रित पहलों के माध्यम से सार्थक परिवर्तन बनाने के लिए प्रतिबद्ध।',
        'footer.bottom': '© 2026 Purpose Impact Organization | पारदर्शिता • विश्वास • प्रभाव',
        'footer.heading.quicklinks': 'त्वरित लिंक',
        'footer.links.home': 'होम',
        'footer.links.about': 'हमारे बारे में',
        'footer.links.mission': 'हमारा मिशन',
        'footer.links.gallery': 'गैलरी',
        'footer.heading.programs': 'हमारे कार्यक्रम',
        'footer.links.education': 'शैक्षिक समर्थन',
        'footer.links.healthcare': 'स्वास्थ्य सेवा',
        'footer.links.community': 'समुदाय विकास',
        'footer.links.volunteer': 'स्वयंसेवक',
        'footer.heading.newsletter': 'समाचार पत्र',
        'footer.newsletter.text': 'हमारे काम पर अपडेट पाने के लिए सदस्यता लें',
        'footer.credits': 'सर्वाधिकार सुरक्षित',
        'gallery.filter.all': 'सभी',
        'gallery.filter.education': 'शिक्षा',
        'gallery.filter.healthcare': 'स्वास्थ्य',
        'gallery.filter.community': 'समुदाय',
        'gallery.filter.events': 'कार्यक्रम',
        'contact.form.name': 'आपका नाम',
        'contact.form.email': 'आपका ईमेल',
        'contact.form.subject': 'विषय',
        'contact.form.message': 'आपका संदेश',
        'contact.form.send': 'संदेश भेजें',
        'testimonials.1.text': '"इस संगठन ने हमारे समुदाय को बदल दिया है। शिक्षा कार्यक्रम ने मेरे बच्चों को ऐसे अवसर दिए जिनका मैंने कभी सोचा भी नहीं था। उनकी पारदर्शी पद्धति और सच्ची देखभाल बड़ा फर्क डालती है।"',
        'testimonials.1.name': 'Sarah Johnson',
        'testimonials.1.role': 'अभिभावक और समुदाय सदस्य',
        'testimonials.2.text': '"इस एनजीओ के साथ वॉलंटियर करना बेहद संतोषजनक रहा है। उनके संरचित कार्यक्रम और सतत प्रभाव पर फोकस वास्तविक परिणाम दिखाते हैं। मुझे इस मिशन का हिस्सा होने पर गर्व है।"',
        'testimonials.2.name': 'Michael Chen',
        'testimonials.2.role': 'वॉलंटियर कोऑर्डिनेटर',
        'testimonials.3.text': '"इस संगठन द्वारा प्रदान की गई स्वास्थ्य पहलों ने हमारे गाँव में जानें बचाईं। पारदर्शिता और नियमित फॉलो-अप के लिए उनकी प्रतिबद्धता स्थायी प्रभाव सुनिश्चित करती है। वाकई असाधारण काम।"',
        'testimonials.3.name': 'Priya Sharma',
        'testimonials.3.role': 'स्वास्थ्य लाभार्थी'
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.mission': 'Mission',
        'nav.gallery': 'Galerie',
        'nav.testimonials': 'Témoignages',
        'nav.impact': 'Impact',
        'nav.contact': 'Contact',
        'hero.title': 'Créer un Impact par le<br>but et la Transparence',
        'hero.subtitle': 'Nous soutenir les communautés et les initiatives qui créent une valeur sociale à long terme grâce à des programmes structurés et des pratiques éthiques.',
        'about.title': 'Qui sommes-nous',
        'impact.subtitle': 'Chiffres qui reflètent notre engagement',
        'impact.stat1': 'Familles Soutenues',
        'impact.stat2': 'Bénévoles Actifs',
        'impact.stat3': 'Projets en Cours',
        'impact.stat4': 'Années de Service',
        'mission.title': 'Notre Mission',
        'gallery.title': 'Notre Galerie',
        'gallery.subtitle': 'Des moments qui définissent notre parcours',
        'testimonials.title': 'Ce que disent les gens',
        'impact.title': 'Notre Impact',
        'contact.title': 'Nous Contacter',
        'hero.cta.support': 'Soutenez Notre Mission',
        'hero.cta.learn': 'En Savoir Plus',
        'about.p1': "Nous sommes une organisation axée sur un objectif, déterminée à autonomiser les communautés par l'éducation, la santé et les initiatives de développement durable.",
        'about.p2': "Notre approche se concentre sur la transparence, la responsabilité et l'impact à long terme. Chaque projet que nous entreprenons est conçu avec les besoins de la communauté au premier plan, garantissant une croissance durable et un changement significatif.",
        'about.feature1': 'Opérations Transparentes',
        'about.feature2': 'Approche Axée sur la Communauté',
        'about.feature3': 'Solutions Durables',
        'mission.card1.title': 'Soutien à l\'éducation',
        'mission.card1.desc': 'Permettre l\'accès à une éducation de qualité pour les enfants défavorisés grâce à des bourses, du matériel pédagogique et des programmes de mentorat.',
        'mission.card1.link': 'En Savoir Plus',
        'mission.card2.title': 'Initiatives de Santé',
        'mission.card2.desc': 'Soutenir les programmes de santé pour un meilleur bien-être communautaire grâce à des campagnes médicales, des programmes de sensibilisation et l\'accès aux soins.',
        'mission.card2.link': 'En Savoir Plus',
        'mission.card3.title': 'Développement Communautaire',
        'mission.card3.desc': 'Construire des solutions durables pour une croissance sociale à long terme grâce au développement des compétences et aux programmes d\'autonomisation.',
        'mission.card3.link': 'En Savoir Plus',
        'gallery.item1.title': 'Programme Éducatif',
        'gallery.item1.desc': 'Autonomiser les esprits jeunes',
        'gallery.item2.title': 'Campagne de Santé',
        'gallery.item2.desc': 'Initiative de bien-être communautaire',
        'gallery.item3.title': 'Soutien Communautaire',
        'donate.title': 'Soutenez Notre Mission',
        'donate.subtitle': 'Votre générosité nous aide à créer un changement durable',
        'donate.scan': 'Scannez avec n\'importe quelle application UPI',
        'donate.why': 'Pourquoi Votre Soutien Est Important',
        'donate.benefit1': 'Impact direct sur les communautés que nous servons',
        'donate.benefit2': 'Utilisation 100% transparente des fonds',
        'donate.benefit3': 'Dons déductibles des impôts (avec reçu)',
        'donate.gateway': '💡 <strong>Bientôt disponible:</strong> Une passerelle de paiement en ligne sera ajoutée pour les dons par carte de crédit/débit',
        'donate.close': 'Fermer',
        'donate.share': 'Partager le Code QR',
        'gallery.item3.desc': 'Construire ensemble',
        'gallery.item4.title': 'Autonomisation des Femmes',
        'gallery.item4.desc': 'Autonomiser et éduquer les femmes',
        'gallery.item5.title': 'Gestion des Catastrophes',
        'gallery.item5.desc': 'Sauver et aider les personnes touchées par des catastrophes naturelles',
        'gallery.item6.title': 'Travail Bénévole',
        'gallery.item6.desc': 'Des mains qui aident',
        'cta.title': 'Ensemble, Nous Pouvons Créer\nUn Changement Significatif',
        'cta.text': "Votre soutien nous aide à continuer à faire une différence dans les communautés du monde entier",
        'cta.button': 'Faire un Don',
        'contact.subtitle': "Des questions ou souhaitez collaborer ? Nous serions ravis d'avoir de vos nouvelles.",
        'contact.address.label': 'Adresse',
        'contact.phone.label': 'Téléphone',
        'contact.email.label': 'E-mail',
        'contact.hours.label': 'Heures d\'ouverture',
        'footer.title': 'Purpose Impact',
        'footer.text': 'Engagés à créer un changement significatif grâce à la transparence, la responsabilité et des initiatives axées sur la communauté.',
        'footer.bottom': '© 2026 Purpose Impact Organization | Transparence • Confiance • Impact',
        'footer.heading.quicklinks': 'Liens Rapides',
        'footer.links.home': 'Accueil',
        'footer.links.about': 'À Propos de Nous',
        'footer.links.mission': 'Notre Mission',
        'footer.links.gallery': 'Galerie',
        'footer.heading.programs': 'Nos Programmes',
        'footer.links.education': 'Soutien Éducatif',
        'footer.links.healthcare': 'Santé',
        'footer.links.community': 'Développement Communautaire',
        'footer.links.volunteer': 'Bénévolat',
        'footer.heading.newsletter': 'Bulletin d\'information',
        'footer.newsletter.text': 'Abonnez-vous pour recevoir des mises à jour sur notre travail',
        'footer.credits': 'Tous les Droits Réservés',
        'gallery.filter.all': 'Tous',
        'gallery.filter.education': 'Éducation',
        'gallery.filter.healthcare': 'Santé',
        'gallery.filter.community': 'Communauté',
        'gallery.filter.events': 'Événements',
        'contact.form.name': 'Votre Nom',
        'contact.form.email': 'Votre E-mail',
        'contact.form.subject': 'Sujet',
        'contact.form.message': 'Votre Message',
        'contact.form.send': 'Envoyer le Message',
        'testimonials.1.text': '"Cette organisation a transformé notre communauté. Le programme d\'éducation a offert à mes enfants des opportunités que je n\'aurais jamais crues possibles. Leur approche transparente et leur attention sincère font toute la différence."',
        'testimonials.1.name': 'Sarah Johnson',
        'testimonials.1.role': 'Parent et membre de la communauté',
        'testimonials.2.text': '"Faire du bénévolat avec cette ONG a été incroyablement gratifiant. Leurs programmes structurés et leur focalisation sur un impact durable montrent de vrais résultats. Je suis fier de faire partie de cette mission."',
        'testimonials.2.name': 'Michael Chen',
        'testimonials.2.role': 'Coordinateur des bénévoles',
        'testimonials.3.text': '"Les initiatives de santé fournies par cette organisation ont sauvé des vies dans notre village. Leur engagement envers la transparence et les suivis réguliers garantit un impact durable. Travail vraiment exceptionnel."',
        'testimonials.3.name': 'Priya Sharma',
        'testimonials.3.role': 'Bénéficiaire des soins de santé'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function initializeLanguage() {
    updateLanguageDisplay();
    applyTranslations();
    console.log('Language initialized to:', currentLanguage);
}

// Global function to change language (called from HTML)
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguageDisplay();
    applyTranslations();
    console.log('Language changed to:', lang);
    return false; // Prevent default link behavior
}

function updateLanguageDisplay() {
    const langDisplay = document.getElementById('currentLang');
    if (langDisplay) {
        langDisplay.textContent = currentLanguage.toUpperCase();
    }
    document.documentElement.lang = currentLanguage;
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            // For buttons and elements with text content
            if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                element.textContent = translations[currentLanguage][key];
            } else {
                element.innerHTML = translations[currentLanguage][key];
            }
        }
    });
    
    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    console.log('Translations applied for:', currentLanguage);
}

// ============================================
// HERO SLIDESHOW
// ============================================
let heroSlideIndex = 0;

function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    // Start the slideshow
    rotateHeroSlide();
}

function rotateHeroSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active class to current slide
    slides[heroSlideIndex].classList.add('active');

    // Move to next slide
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;

    // Change slide every 5 seconds
    setTimeout(rotateHeroSlide, 5000);
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
});

// ============================================
// DONATION MODAL
// ============================================
const donateBtn = document.getElementById('donateBtn');
const donationModal = document.getElementById('donationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalClose = document.querySelector('.modal-close');
const shareBtn = document.getElementById('shareBtn');

// Open modal when donate button is clicked
if (donateBtn) {
    donateBtn.addEventListener('click', function() {
        donationModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal function
function closeModal() {
    donationModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when close button is clicked
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal when X button is clicked
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside of it
donationModal.addEventListener('click', function(e) {
    if (e.target === donationModal) {
        closeModal();
    }
});

// Share QR code functionality
if (shareBtn) {
    shareBtn.addEventListener('click', function() {
        const qrImage = document.querySelector('.qr-code');
        if (navigator.share) {
            navigator.share({
                title: 'Support Purpose Impact',
                text: 'Please support our mission through UPI',
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: Copy to clipboard
            const text = 'Donate via UPI: organization@upi\nScan the QR code or use this UPI ID';
            navigator.clipboard.writeText(text).then(() => {
                alert('QR Code details copied to clipboard!');
            });
        }
    });
}