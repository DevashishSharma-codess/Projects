/**
 * Module 1: Preloader Screen Handler
 */
export const initPreloader = () => {
    const pageLoader = document.getElementById('pageLoader');
    const lottiePlayer = document.getElementById('lottiePlayer');

    if (lottiePlayer) {
        lottiePlayer.addEventListener('ready', () => {
            lottiePlayer.seek(0);
            lottiePlayer.play();
        });
    }

    if (pageLoader) {
        const hideLoader = () => {
            pageLoader.classList.add('hidden');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 650);
        };

        if (document.readyState === 'complete') {
            setTimeout(hideLoader, 1000);
        } else {
            window.addEventListener('load', () => setTimeout(hideLoader, 1000));
            setTimeout(hideLoader, 2500);
        }
    }
};
