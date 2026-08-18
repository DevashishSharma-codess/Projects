/**
 * Back To Top Module
 * Creates and controls a floating button that appears when the user scrolls down,
 * and smoothly scrolls the page back to the top when clicked.
 */
export const initBackToTop = () => {
    // 1. SELECT OR CREATE BUTTON DOM ELEMENT
    let backBtn = document.getElementById('backToTopBtn');

    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.id = 'backToTopBtn';
        backBtn.className = 'back-to-top';
        backBtn.setAttribute('aria-label', 'Back to top');
        backBtn.innerHTML = '&#8593;';
        document.body.appendChild(backBtn);
    }

    // 2. SHOW OR HIDE BUTTON BASED ON SCROLL POSITION
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    }, { passive: true });

    // 3. SMOOTH SCROLL TO TOP ON BUTTON CLICK
    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};
