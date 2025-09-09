document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;
    const heroTitle = document.getElementById('hero-title');
    const nameTitle = document.getElementById('name-title');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        heroTitle.classList.remove('text-white');
        heroTitle.classList.add('text-text');
        nameTitle.classList.remove('text-white');
        nameTitle.classList.add('text-text');
    } else {
        body.classList.add('dark-mode');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
        heroTitle.classList.add('text-white');
        heroTitle.classList.remove('text-text');
        nameTitle.classList.add('text-white');
        nameTitle.classList.remove('text-text');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
            heroTitle.classList.remove('text-white');
            heroTitle.classList.add('text-text');
            nameTitle.classList.remove('text-white');
            nameTitle.classList.add('text-text');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
            heroTitle.classList.add('text-white');
            heroTitle.classList.remove('text-text');
            nameTitle.classList.add('text-white');
            nameTitle.classList.remove('text-text');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Animate Project Cards on Load
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.style.opacity = 1;
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe scroll-animate elements
    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => observer.observe(el));

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Typing Animation Effect
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.width = '0';
        
        setTimeout(() => {
            typingElement.style.width = '100%';
            typingElement.textContent = text;
        }, 1000);
    }

    // Enhanced Button Interactions
    const animatedButtons = document.querySelectorAll('.animated-button');
    animatedButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Project Card Hover Effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Loading Animation for External Links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', () => {
            const originalText = link.textContent;
            link.innerHTML = `<span class="loading-dots">${originalText}</span>`;
            
            setTimeout(() => {
                link.textContent = originalText;
            }, 2000);
        });
    });

    // Dynamic Background Gradient
    let gradientAngle = 0;
    setInterval(() => {
        gradientAngle += 1;
        const gradientElements = document.querySelectorAll('.animate-gradient');
        gradientElements.forEach(el => {
            el.style.background = `linear-gradient(${gradientAngle}deg, var(--color-accent), #3B82F6, #8B5CF6, var(--color-accent))`;
        });
    }, 100);

    // Mouse Follower Effect (subtle)
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor-follower');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // Add floating particles effect
    createFloatingParticles();

    // Initialize mobile app carousels
    initializeMobileCarousels();
    
    // Initialize phone mockup carousels
    initializePhoneCarousels();
});

// Floating Particles Effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--color-accent);
        border-radius: 50%;
        opacity: 0.3;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
}

// Mobile App Carousel Functionality
function initializeMobileCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentSlide = 0;
        
        // Auto-rotate slides every 3 seconds
        const autoRotate = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(carousel, slides, indicators, currentSlide);
        }, 3000);
        
        // Pause auto-rotation on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        // Resume auto-rotation when mouse leaves
        carousel.addEventListener('mouseleave', () => {
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(carousel, slides, indicators, currentSlide);
            }, 3000);
        });
        
        // Indicator click handlers
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(carousel, slides, indicators, currentSlide);
            });
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    currentSlide = (currentSlide + 1) % slides.length;
                } else {
                    // Swipe right - previous slide
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                }
                showSlide(carousel, slides, indicators, currentSlide);
            }
        }
    });
}

function showSlide(carousel, slides, indicators, slideIndex) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    slides[slideIndex].classList.add('active');
    indicators[slideIndex].classList.add('active');
}

// Phone Mockup Carousel Functionality
function initializePhoneCarousels() {
    const phoneMockups = document.querySelectorAll('.phone-mockup[data-carousel]');
    
    phoneMockups.forEach(mockup => {
        const slides = mockup.querySelectorAll('.phone-slide');
        let currentSlide = 0;
        
        // Auto-rotate slides every 3 seconds
        const autoRotate = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showPhoneSlide(slides, currentSlide);
        }, 3000);
        
        // Pause auto-rotation on hover
        mockup.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        // Resume auto-rotation when mouse leaves
        mockup.addEventListener('mouseleave', () => {
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showPhoneSlide(slides, currentSlide);
            }, 3000);
        });
    });
}

function showPhoneSlide(slides, slideIndex) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show current slide
    slides[slideIndex].classList.add('active');
}
