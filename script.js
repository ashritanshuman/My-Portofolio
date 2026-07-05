// ==========================================
// ASHRIT ANSHUMAN PORTFOLIO - VANILLA JS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
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
    // NAVIGATION SCROLL EFFECTS
    // ==========================================
    
    const nav = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
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
            const messagePayload = document.getElementById('messagePayload')?.value.trim();
            
            if (!userName || !emailAddress || !messagePayload) {
                alert('Please fill in all fields.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailAddress)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'SENDING...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully!');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // ==========================================
    // PROJECT CARDS INTERACTION
    // ==========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
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
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
                alert(`${this.textContent.trim()} profile coming soon!`);
            }
        });
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navbarLinks = document.querySelector('.navbar-links');
    const menuIconSymbol = document.getElementById('menuIcon');
    let menuOpen = false;
    
    function setMenuIcon(open) {
        if (menuIconSymbol) {
            menuIconSymbol.textContent = open ? 'close' : 'menu';
        }
        if (mobileMenuIcon) {
            mobileMenuIcon.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
    }
    
    // Initialize mobile menu state
    function initMobileMenu() {
        if (window.innerWidth < 768) {
            navbarLinks.style.display = 'none';
            setMenuIcon(false);
        } else {
            navbarLinks.style.display = '';
            setMenuIcon(false);
        }
    }
    
    initMobileMenu();
    
    if (mobileMenuIcon && navbarLinks) {
        function toggleMenu() {
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
            } else {
                navbarLinks.style.display = 'none';
            }
            setMenuIcon(menuOpen);
        }
        
        mobileMenuIcon.addEventListener('click', toggleMenu);
        
        // Keyboard accessibility for the menu trigger
        mobileMenuIcon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        // Close menu on link click
        navbarLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                if (window.innerWidth < 768) {
                    navbarLinks.style.display = 'none';
                }
                setMenuIcon(false);
            });
        });
        
        // Reset menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navbarLinks.removeAttribute('style');
                menuOpen = false;
                setMenuIcon(false);
            } else if (!menuOpen) {
                navbarLinks.style.display = 'none';
                setMenuIcon(false);
            }
        });
    }

});