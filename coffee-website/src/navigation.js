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
    });

    // 3. MOBILE MENU TOGGLE AND AUTO-DISMISS LOGIC
    if (menuToggle && navList) {
        // Helper function to close the mobile drawer menu
        function closeMenu() {
            navList.classList.remove('mobile-open');
          
        }

        // Toggle mobile drawer open or closed when clicking the hamburger button
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            if (navList.classList.contains('mobile-open')) {
                navList.classList.remove('mobile-open');
               
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
    let currentSection = ''; // Create a blank label to hold where we are

    // STEP 1: Find out which section we are looking at
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        
        // If we have scrolled past the top of this section, update the label
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    // STEP 2: Highlight the correct link in the menu
    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        
        // If the link matches our current section label, make it active
        if (href === '#' + currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Otherwise, remove the highlight
        }
    });
}


    // Run active link check on page scroll
    window.addEventListener('scroll', updateActiveNavLinks, { passive: true });
    updateActiveNavLinks(); // Run once on initial page load
};
