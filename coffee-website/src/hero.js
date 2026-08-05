/**
 * Module 3: Hero Background Video Autoplay
 */
export const initHeroVideo = () => {
    const bgVideos = document.querySelectorAll('.hero video, .hero-bg-video video');
    bgVideos.forEach(video => {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                video.muted = true;
                video.play();
            });
        }
    });
};
