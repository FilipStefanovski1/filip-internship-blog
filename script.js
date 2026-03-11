/* ============================================================
   INTERNSHIP BLOG — JAVASCRIPT
   Filip Stefanovski

   Features:
   1. Smooth scrolling for nav links
   2. Active nav link highlighting on scroll
   3. Navbar style change on scroll
   4. Reveal-on-scroll animations
   5. Back-to-top button
   6. Mobile nav toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------
       ELEMENTS
       -------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');
    const backToTopBtn = document.getElementById('backToTop');
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id]');

    /* --------------------------------------------------------
       1. SMOOTH SCROLLING
       Clicking a nav link scrolls smoothly to the section.
       Also closes the mobile menu if open.
       -------------------------------------------------------- */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile menu after clicking
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        });
    });

    /* --------------------------------------------------------
       2. ACTIVE NAV LINK HIGHLIGHTING
       Highlights the nav link corresponding to the section
       currently in view.
       -------------------------------------------------------- */
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* --------------------------------------------------------
       3. NAVBAR SCROLL EFFECT
       Adds a subtle shadow/border when the user scrolls
       past the top of the page.
       -------------------------------------------------------- */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* --------------------------------------------------------
       4. REVEAL ON SCROLL
       Elements with the class "reveal" fade in when they
       enter the viewport.
       -------------------------------------------------------- */
    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 80;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('revealed');
            }
        });
    }

    /* --------------------------------------------------------
       5. BACK TO TOP BUTTON
       Shows the button after scrolling down, hides it at top.
       -------------------------------------------------------- */
    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --------------------------------------------------------
       6. MOBILE NAV TOGGLE
       Opens and closes the navigation menu on mobile.
       -------------------------------------------------------- */
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
        }
    });

    /* --------------------------------------------------------
       SCROLL EVENT LISTENER
       Combines all scroll-dependent functions into one
       efficient listener.
       -------------------------------------------------------- */
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveLink();
        revealOnScroll();
        handleBackToTop();
    });

    /* --------------------------------------------------------
       7. INTERNSHIP PROGRESS BAR
       Calculates how far through the internship period
       (9 Feb 2026 to 15 May 2026) and animates the bar.
       -------------------------------------------------------- */
    function updateProgress() {
        const startDate = new Date('2026-02-09');
        const endDate = new Date('2026-05-15');
        const now = new Date();

        const total = endDate - startDate;
        const elapsed = now - startDate;
        const percent = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));

        const fill = document.getElementById('progressFill');
        const label = document.getElementById('progressPercent');

        if (fill && label) {
            label.textContent = percent + '%';
            // Small delay so the animation is visible on load
            setTimeout(() => {
                fill.style.width = percent + '%';
            }, 400);
        }
    }

    /* --------------------------------------------------------
       INITIAL CALLS
       Run on page load so elements in view are visible
       immediately.
       -------------------------------------------------------- */
    handleNavbarScroll();
    revealOnScroll();
    updateActiveLink();
    updateProgress();

});
