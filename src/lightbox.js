/**
 * Module 6: Combined Lightbox Modal for Gallery & Carousel Images
 */
export const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox || !lightboxImg || !lightboxClose) return;

    const allLightboxImages = Array.from(document.querySelectorAll('#galleryGrid img, #carouselTrack img'));
    if (allLightboxImages.length === 0) return;

    let currentIndex = 0;

    const openLightbox = (index) => {
        currentIndex = (index + allLightboxImages.length) % allLightboxImages.length;
        const targetImg = allLightboxImages[currentIndex];
        if (targetImg) {
            lightboxImg.style.opacity = '0';
            lightboxImg.src = targetImg.src;
            lightboxImg.alt = targetImg.alt || 'Enlarged photo';
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                lightboxImg.style.opacity = '1';
            }, 50);
        }
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    };

    const nextPhoto = () => openLightbox(currentIndex + 1);
    const prevPhoto = () => openLightbox(currentIndex - 1);

    allLightboxImages.forEach((img, idx) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(idx);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevPhoto(); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextPhoto(); });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrap')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        } else if (e.key === 'ArrowLeft') {
            prevPhoto();
        }
    });

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? nextPhoto() : prevPhoto();
        }
    }, { passive: true });
};
