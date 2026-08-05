/**
 * Module 2: Sticky Header, Mobile Nav & Active Scroll Spy
 */
export const initNavigation = () => {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    const handleHeaderScroll = () => {
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    if (menuToggle && navList) {
        const toggleMenu = () => {
            const isOpen = navList.classList.contains('mobile-open') || navList.style.display === 'flex';
            if (isOpen) {
                navList.style.display = 'none';
                navList.classList.remove('mobile-open');
            } else {
                navList.style.display = 'flex';
                navList.classList.add('mobile-open');
            }
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 700) {
                    navList.style.display = 'none';
                    navList.classList.remove('mobile-open');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 700 && navList.style.display === 'flex') {
                if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
                    navList.style.display = 'none';
                    navList.classList.remove('mobile-open');
                }
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 700) {
                navList.style.display = '';
                navList.classList.remove('mobile-open');
            }
        });
    }

    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        const targetHref = link.getAttribute('href').substring(1);
                        if (targetHref === currentId) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList && navList.style.display === 'flex') {
            navList.style.display = 'none';
            navList.classList.remove('mobile-open');
        }
    });
};
