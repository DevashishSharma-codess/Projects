/**
 * Navigation Module
 * Controls the sticky header bar on scroll, the responsive mobile menu drawer,
 * and active navbar link highlighting using basic scroll position math.
 */
export const initNavigation = () => {
    // 1. SELECT DOM ELEMENTS
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // 2. STICKY HEADER ON SCROLL
    // Adds dark background styling to top header when scrolling down past 40px
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, { passive: true });

    // 3. MOBILE MENU TOGGLE AND AUTO-DISMISS LOGIC
    if (menuToggle && navList) {
        // Helper function to close the mobile drawer menu
        function closeMenu() {
            navList.classList.remove('mobile-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        // Toggle mobile drawer open or closed when clicking the hamburger button
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            if (navList.classList.contains('mobile-open')) {
                navList.classList.remove('mobile-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                navList.classList.add('mobile-open');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Close mobile drawer when clicking any navigation link
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close mobile drawer when clicking anywhere outside the navbar
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navList.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle) {
                closeMenu();
            }
        });

        // Close mobile drawer when pressing the Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    // 4. ACTIVE SCROLL SPY (SECTION HIGHLIGHTING)
    // Checks window scroll position to highlight whichever section is currently visible on screen
    function updateActiveNavLinks() {
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120; // Offset for sticky header height
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if current scroll position lies within this section's vertical area
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href === '#' + sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    // Run active link check on page scroll
    window.addEventListener('scroll', updateActiveNavLinks, { passive: true });
    updateActiveNavLinks(); // Run once on initial page load
};
