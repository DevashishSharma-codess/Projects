/**
 * Module 9: Back To Top Button Handler
 */
export const initBackToTop = () => {
    let backBtn = document.getElementById('backToTopBtn');
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.id = 'backToTopBtn';
        backBtn.className = 'back-to-top';
        backBtn.setAttribute('aria-label', 'Back to top');
        backBtn.innerHTML = '&#8593;';
        document.body.appendChild(backBtn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    }, { passive: true });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};
