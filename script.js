// Navigation Toggle for Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignore bare "#" links (e.g. placeholder demo/GitHub buttons)
        if (href === '#') {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Move keyboard focus to the target so skip links work for screen readers
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Reset form message
        formMessage.className = 'form-message';
        formMessage.textContent = '';
        formMessage.style.display = 'none';

        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Lütfen tüm alanları doldurun.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Lütfen geçerli bir email adresi girin.', 'error');
            return;
        }

        try {
            // Option 1: Using Formspree (uncomment and add your Formspree endpoint)
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // });

            // Option 2: Using EmailJS (uncomment and configure)
            // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data)
            //     .then(() => {
            //         showFormMessage('Mesajınız başarıyla gönderildi!', 'success');
            //         contactForm.reset();
            //     })
            //     .catch(() => {
            //         showFormMessage('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            //     });

            // Option 3: Using mailto (fallback)
            const mailtoLink = `mailto:email@example.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`İsim: ${data.name}\nEmail: ${data.email}\n\nMesaj:\n${data.message}`)}`;
            window.location.href = mailtoLink;
            
            // Show success message
            showFormMessage('Email uygulamanız açılıyor. Mesajınızı gönderebilirsiniz.', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan email gönderin.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .project-card-large, .about-content, .contact-wrapper');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active Navigation Link Highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Lazy Loading for Images (when actual images are added)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Performance: Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll to top functionality (optional enhancement)
let scrollToTopBtn = null;

function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(scrollToTopBtn);

    const handleScroll = debounce(() => {
        scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    }, 100);

    window.addEventListener('scroll', handleScroll);
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);
