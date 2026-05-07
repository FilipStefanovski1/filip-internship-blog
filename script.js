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

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
       8. FOOTER LIVE CLOCK
       Shows the current time in Skopje (CET/CEST).
       -------------------------------------------------------- */
    function updateFooterClock() {
        const clockEl = document.getElementById('footerClock');
        if (!clockEl) return;
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', {
            timeZone: 'Europe/Skopje',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        clockEl.textContent = time;
    }

    updateFooterClock();
    setInterval(updateFooterClock, 1000);

    /* --------------------------------------------------------
       9. LOGOS STRIP
       Shows the logo image when src is set, hides placeholder.
       -------------------------------------------------------- */
    document.querySelectorAll('.logo-img').forEach(img => {
        if (!img.getAttribute('src')) return;
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.addEventListener('error', () => {}); // keep placeholder on broken src
        if (img.complete && img.naturalWidth) img.classList.add('loaded');
    });

    /* --------------------------------------------------------
       10. DESIGNS GALLERY — Filter & Lightbox
       -------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const designItems = document.querySelectorAll('.design-item');

    // Mark cards that have a real image src
    designItems.forEach(item => {
        const img = item.querySelector('.design-img');
        const wrap = item.querySelector('.design-img-wrap');
        if (img && img.getAttribute('src')) {
            wrap.classList.add('has-image');
        }
    });

    // Filter tabs
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            designItems.forEach(item => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.classList.toggle('hidden', !match);
            });
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let lbItems = [];
    let lbIndex = 0;

    function getVisibleWithImages() {
        return [...designItems].filter(item =>
            !item.classList.contains('hidden') &&
            item.querySelector('.design-img-wrap').classList.contains('has-image')
        );
    }

    function showLightboxItem() {
        const item = lbItems[lbIndex];
        const img = item.querySelector('.design-img');
        const cap = item.querySelector('.design-caption');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = cap ? cap.textContent : '';
        lightboxPrev.classList.toggle('hidden', lbIndex === 0);
        lightboxNext.classList.toggle('hidden', lbIndex === lbItems.length - 1);
    }

    function openLightbox(index) {
        lbItems = getVisibleWithImages();
        if (!lbItems.length) return;
        lbIndex = index;
        showLightboxItem();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    designItems.forEach(item => {
        const wrap = item.querySelector('.design-img-wrap');
        wrap.addEventListener('click', () => {
            if (!wrap.classList.contains('has-image')) return;
            const visible = getVisibleWithImages();
            const idx = visible.indexOf(item);
            if (idx !== -1) openLightbox(idx);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => { if (lbIndex > 0) { lbIndex--; showLightboxItem(); } });
    if (lightboxNext) lightboxNext.addEventListener('click', () => { if (lbIndex < lbItems.length - 1) { lbIndex++; showLightboxItem(); } });
    if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lbIndex > 0) { lbIndex--; showLightboxItem(); }
        if (e.key === 'ArrowRight' && lbIndex < lbItems.length - 1) { lbIndex++; showLightboxItem(); }
    });

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
