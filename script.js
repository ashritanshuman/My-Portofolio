// ==========================================
// ASHRIT ANSHUMAN PORTFOLIO - VANILLA JS
// Smooth Loading & Smooth Scrolling
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // FIX PAGE RELOAD SCROLL POSITION
    // ==========================================
    
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // ==========================================
    // SMOOTH PAGE LOADING - No fade, instant render
    // ==========================================
    // Body is already visible, no animation delay

    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==========================================
    
    // Only enable animations if not reduced motion preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const staggerContainer = entry.target.querySelector('.stagger-children');
                    if (staggerContainer) {
                        staggerContainer.classList.add('visible');
                    }
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add animation class and observe sections (except hero)
        document.querySelectorAll('section:not(.hero)').forEach((section) => {
            section.classList.add('animate-on-scroll');
            const staggerContainer = section.querySelector('.stagger-children');
            if (staggerContainer) {
                staggerContainer.classList.add('animate-on-scroll');
            }
            sectionObserver.observe(section);
        });
    }

    // Parallax removed for better performance

    // ==========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // NAVIGATION SCROLL EFFECTS - Simplified
    // ==========================================
    
    const nav = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Simple background opacity change only
        if (currentScroll > 100) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    }, { passive: true });

    nav.style.transition = 'background-color 0.3s ease';

    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value.trim();
            const emailAddress = document.getElementById('emailAddress').value.trim();
            const messagePayload = document.getElementById('messagePayload').value.trim();
            
            if (!userName || !emailAddress || !messagePayload) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailAddress)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Animate button
            submitButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitButton.textContent = 'SENDING...';
                submitButton.disabled = true;
                submitButton.style.transform = 'scale(1)';
            }, 150);
            
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'error' ? '#ff7351' : '#b7fe00'};
            color: ${type === 'error' ? '#fff' : '#0e0e0e'};
            font-family: 'Space Grotesk', monospace;
            font-size: 0.875rem;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    // ==========================================
    // PROJECT CARDS INTERACTION
    // ==========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project-title, .project-title-small').textContent.trim();
            console.log(`Project clicked: ${projectTitle}`);
        });
    });

    // ==========================================
    // HIRE ME BUTTON
    // ==========================================
    
    const hireMeButton = document.querySelector('.btn-hire');
    if (hireMeButton) {
        hireMeButton.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = 80;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                smoothScrollTo(offsetPosition, 800);
            }
        });
    }

    // ==========================================
    // SOCIAL LINKS
    // ==========================================
    
    const socialLinks = document.querySelectorAll('.footer-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                const platform = this.textContent.trim();
                showNotification(`${platform} profile coming soon!`, 'info');
            }
        });
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navbarLinks = document.querySelector('.navbar-links');
    let menuOpen = false;
    
    // Initialize mobile menu state
    function initMobileMenu() {
        if (window.innerWidth < 768) {
            navbarLinks.style.display = 'none';
        } else {
            navbarLinks.style.display = '';
        }
    }
    
    // Run on load
    initMobileMenu();
    
    if (mobileMenuIcon && navbarLinks) {
        mobileMenuIcon.addEventListener('click', function() {
            menuOpen = !menuOpen;
            
            if (menuOpen) {
                navbarLinks.style.display = 'flex';
                navbarLinks.style.flexDirection = 'column';
                navbarLinks.style.position = 'absolute';
                navbarLinks.style.top = '100%';
                navbarLinks.style.left = '0';
                navbarLinks.style.right = '0';
                navbarLinks.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
                navbarLinks.style.padding = '1.5rem';
                navbarLinks.style.backdropFilter = 'blur(20px)';
                navbarLinks.style.borderBottom = '1px solid #494847';
                navbarLinks.style.transform = 'translateY(-20px)';
                navbarLinks.style.opacity = '0';
                
                setTimeout(() => {
                    navbarLinks.style.transform = 'translateY(0)';
                    navbarLinks.style.opacity = '1';
                }, 10);
            } else {
                navbarLinks.style.transform = 'translateY(-20px)';
                navbarLinks.style.opacity = '0';
                setTimeout(() => {
                    navbarLinks.style.display = 'none';
                }, 300);
            }
        });
        
        // Close menu on link click
        navbarLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                // Only hide if mobile viewport
                if (window.innerWidth < 768) {
                    navbarLinks.style.transform = 'translateY(-20px)';
                    navbarLinks.style.opacity = '0';
                    setTimeout(() => {
                        navbarLinks.style.display = 'none';
                    }, 300);
                }
            });
        });
        
        // Reset menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                // Reset to desktop styles - clear all inline styles
                navbarLinks.removeAttribute('style');
                menuOpen = false;
            } else if (!menuOpen) {
                // Ensure hidden on mobile when closed
                navbarLinks.style.display = 'none';
            }
        });
    }

    // ==========================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #b7fe00, #e9ffbc);
        z-index: 10001;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });

    // ==========================================
    // CONSOLE ART
    // ==========================================
    
    console.log('%c ASHRIT ANSHUMAN ', 'background: #b7fe00; color: #0e0e0e; font-size: 24px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Data Scientist & Web Developer ', 'color: #b7fe00; font-size: 14px;');
    console.log('%c Turning raw data into precision decisions through algorithmic rigor. ', 'color: #adaaaa; font-size: 12px;');
    console.log('%c Portfolio built with vanilla HTML, CSS & JavaScript ', 'color: #777575; font-size: 10px; font-style: italic;');
    console.log('%c ✨ Smooth scrolling & loading animations enabled ', 'color: #b7fe00; font-size: 11px;');

});