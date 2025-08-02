// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Script starting');
    
    const modernNav = document.getElementById('modernNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.q    // Mechanical keyboard key interaction
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const keySound = new Audio('keyboard-sound.wav'); // Path to sound file

    keyboardKeys.forEach(key => {
        key.addEventListener('mouseenter', function() {
            const keyCap = this.querySelector('.key-cap');
            keyCap.style.animationPlayState = 'paused';
            keyCap.style.transform = 'translateY(-4px)';
        });
        
        key.addEventListener('mouseleave', function() {
            const keyCap = this.querySelector('.key-cap');
            keyCap.style.animationPlayState = 'running';
            keyCap.style.transform = 'translateY(0)';
        });
        
        key.addEventListener('click', function() {
            const keyCap = this.querySelector('.key-cap');
            keyCap.style.animation = 'keyPress 0.2s ease';
            setTimeout(() => {
                keyCap.style.animation = '';
            }, 200);

            // Play keyboard sound effect
            keySound.currentTime = 0; // Reset sound to start
            keySound.play();
        });
    });

    // ...existing code...('.section, .hero-section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Active section highlighting
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }

    // Scroll event listener for active section
    window.addEventListener('scroll', updateActiveSection);

    // Initial call to set active section
    updateActiveSection();

    // --- Orion Constellation 3D Cursor Interaction ---
    const heroBackground = document.querySelector('.hero-background');
    const stars = document.querySelectorAll('.orion-star');
    const crystal = document.querySelector('.geometric-crystal');
    const abstractShape = document.querySelector('.abstract-shape');
    const constellationLines = document.querySelector('.constellation-lines');

    let mouseX = 0, mouseY = 0, isMouseOver = false;
    let currentX = 0, currentY = 0;

    console.log('Orion stars found:', stars.length);

    function animateParallax() {
        if (!isMouseOver) {
            currentX += (0 - currentX) * 0.2;
            currentY += (0 - currentY) * 0.2;
        } else {
            currentX += (mouseX - currentX) * 0.2;
            currentY += (mouseY - currentY) * 0.2;
        }
        
        // Move Orion stars with different speeds based on their importance
        stars.forEach((star, idx) => {
            const starName = star.getAttribute('data-star');
            let speed = 0.15; // base speed
            
            // Different speeds for different stars
            switch(starName) {
                case 'rigel':
                case 'betelgeuse':
                    speed = 0.2; // brightest stars move more
                    break;
                case 'alnilam':
                case 'alnitak':
                case 'mintaka':
                    speed = 0.25; // belt stars move together
                    break;
                default:
                    speed = 0.15;
            }
            
            const x = currentX * speed;
            const y = currentY * speed;
            star.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Move crystal
        if (abstractShape) {
            const crystalSpeed = 0.18;
            const x = currentX * crystalSpeed;
            const y = currentY * crystalSpeed;
            abstractShape.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
        
        // Animate constellation lines
        if (constellationLines) {
            const lineSpeed = 0.05;
            const x = currentX * lineSpeed;
            const y = currentY * lineSpeed;
            constellationLines.style.transform = `translate(${x}px, ${y}px)`;
        }
        
        requestAnimationFrame(animateParallax);
    }

    if (heroBackground) {
        heroBackground.addEventListener('mousemove', function(e) {
            const rect = heroBackground.getBoundingClientRect();
            mouseX = e.clientX - rect.left - rect.width / 2;
            mouseY = e.clientY - rect.top - rect.height / 2;
            isMouseOver = true;
            
            if (window.DEBUG_CURSOR) {
                console.log('mousemove', mouseX, mouseY);
            }
        });
        
        heroBackground.addEventListener('mouseleave', function() {
            isMouseOver = false;
            if (window.DEBUG_CURSOR) {
                console.log('mouseleave');
            }
        });
        
        animateParallax();
    } else {
        console.log('heroBackground not found');
    }

    // Star hover effects with constellation info
    stars.forEach((star) => {
        star.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
            const starName = this.getAttribute('data-star');
            if (window.DEBUG_CURSOR) {
                console.log('Orion star hover:', starName);
            }
        });
        
        star.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
    
    // Crystal hover effects
    if (crystal) {
        crystal.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
            if (window.DEBUG_CURSOR) {
                console.log('crystal hover');
            }
        });
        
        crystal.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    }
    // --- End Orion Constellation Interaction ---

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const workCards = document.querySelectorAll('.work-card');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }

        // Animate work cards on scroll
        workCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardHeight = card.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition + windowHeight > cardTop && scrollPosition < cardTop + cardHeight) {
                card.style.transform = `translateY(0) scale(1)`;
                card.style.opacity = '1';
            }
        });
    });

    // Typing animation for hero text
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.work-card, .hero-content, .section');
    animateElements.forEach(el => observer.observe(el));

    // Add smooth reveal animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .work-card,
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .work-card.animate-in,
        .hero-content.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .work-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Add initial animation class to hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-in');
        }
    }, 300);

    // Work card hover effects
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating animation to profile badge
    const profileBadge = document.querySelector('.profile-badge');
    if (profileBadge) {
        let floatDirection = 1;
        
        setInterval(() => {
            floatDirection *= -1;
            profileBadge.style.transform = `translateY(${floatDirection * 3}px)`;
        }, 2000);
    }

    // Hero cube interaction
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => {
        cube.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-15px) rotateX(45deg) rotateY(45deg) scale(1.1)';
        });
        
        cube.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });

    // Learn more button functionality
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Scroll to about section or show more info
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            // Add menu functionality here if needed
        });
    }

    // Handle resize events
    window.addEventListener('resize', function() {
        updateActiveSection();
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Stagger animation for work cards
        workCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200 + 800);
        });
    });
});

// Utility functions
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

// Debounced scroll handler
const debouncedScroll = debounce(() => {
    // Add any scroll-dependent functionality here
}, 10);

window.addEventListener('scroll', debouncedScroll);
