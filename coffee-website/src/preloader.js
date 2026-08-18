/**
 * Preloader Module
 * Manages the initial page loading screen and Lottie brewing animation overlay.
 */
export const initPreloader = () => {
    // 1. SELECT DOM ELEMENTS
    const pageLoader = document.getElementById('pageLoader');
    const lottiePlayer = document.getElementById('lottiePlayer');

    // 2. PLAY ANIMATION WHEN READY
    if (lottiePlayer) {
        lottiePlayer.addEventListener('ready', () => {
            lottiePlayer.seek(0);
            lottiePlayer.play();
        });
    }

    // 3. DISMISS LOADING OVERLAY SCREEN
    if (pageLoader) {
        // Function to hide and remove loading screen from display
        function hideLoader() {
            pageLoader.classList.add('hidden');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 650);
        }

        // Check if document page loading is already complete
        if (document.readyState === 'complete') {
            setTimeout(hideLoader, 1000);
        } else {
            // Wait for full window load event
            window.addEventListener('load', () => {
                setTimeout(hideLoader, 1000);
            });

            // Safety fallback timeout to hide loader after 2.5 seconds
            setTimeout(hideLoader, 2500);
        }
    }
};
