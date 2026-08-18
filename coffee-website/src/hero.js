/**
 * Hero Background Video Module
 * Ensures background videos in the hero section are muted and autoplay smoothly.
 */
export const initHeroVideo = () => {
    // 1. SELECT HERO VIDEO ELEMENTS
    const videos = document.querySelectorAll('.hero video, .hero-bg-video video');

    // 2. PLAY VIDEOS WITH MUTED AUTOPLAY
    videos.forEach((video) => {
        // Mute video to comply with browser autoplay security policies
        video.muted = true;

        const playPromise = video.play();

        // Fallback retry if browser blocks initial autoplay attempt
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                video.muted = true;
                video.play();
            });
        }
    });
};
