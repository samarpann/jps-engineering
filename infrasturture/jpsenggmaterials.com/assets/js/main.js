/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(11, 17, 32, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(11, 17, 32, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ====== Animated Counter ======
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    };

    // Intersection Observer for Counter Animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observerOptions = {
            root: null,
            threshold: 0.3,
            rootMargin: '0px'
        };

        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true;
                }
            });
        }, observerOptions);

        observer.observe(statsSection);
    }

    // ====== Smooth Scroll for Anchor Links ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ====== Parallax Effect for Hero ======
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // ====== Typing Effect for Hero Title (Optional Enhancement) ======
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.dataset.typed) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    // ====== Image Lazy Loading ======
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ====== Form Validation Enhancement ======
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                    field.addEventListener('input', () => {
                        field.style.borderColor = '';
                    }, {
                        once: true
                    });
                }
            });

            if (!isValid) {
                e.preventDefault();
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-error';
                errorMsg.textContent = 'Please fill in all required fields.';
                errorMsg.style.cssText = 'color: #ff4444; text-align: center; margin-top: 15px; font-size: 0.9rem;';

                const existingError = form.querySelector('.form-error');
                if (existingError) existingError.remove();
                form.appendChild(errorMsg);

                setTimeout(() => errorMsg.remove(), 3000);
            }
        });
    });

    // ====== Add Active State to Current Page Nav Link ======
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    console.log('JPS Engineering - Website Loaded Successfully');
});