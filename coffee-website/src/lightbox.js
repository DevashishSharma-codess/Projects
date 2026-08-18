/**
 * Image Lightbox Modal Module
 * Opens photos in a full-screen popup modal when clicked, with next/previous buttons,
 * keyboard controls, and mobile swipe gestures.
 */
export const initLightbox = () => {
    // 1. SELECT LIGHTBOX DOM ELEMENTS
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // Get all gallery and carousel images
    const images = Array.from(document.querySelectorAll('#galleryGrid img, #carouselTrack img'));

    if (!lightbox || !lightboxImg || !lightboxClose || images.length === 0) {
        return;
    }

    let currentIndex = 0;

    // 2. HELPER FUNCTIONS TO OPEN AND CLOSE LIGHTBOX
    function showPhoto(index) {
        // Handle wrap-around bounds
        if (index < 0) {
            currentIndex = images.length - 1;
        } else if (index >= images.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Set image source and alt text
        const targetImage = images[currentIndex];
        lightboxImg.style.opacity = '0';
        lightboxImg.src = targetImage.src;
        lightboxImg.alt = targetImage.alt || 'Enlarged photo';

        // Show modal and disable body page scrolling
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Smooth fade-in
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
        }, 50);
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    // 3. ATTACH CLICK LISTENERS TO IMAGES AND BUTTONS
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (event) => {
            event.stopPropagation();
            showPhoto(index);
        });
    });

    // Close on 'X' button click
    lightboxClose.addEventListener('click', closeLightbox);

    // Show previous photo on left arrow click
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (event) => {
            event.stopPropagation();
            showPhoto(currentIndex - 1);
        });
    }

    // Show next photo on right arrow click
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (event) => {
            event.stopPropagation();
            showPhoto(currentIndex + 1);
        });
    }

    // Close when clicking dark backdrop overlay
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target.classList.contains('lightbox-img-wrap')) {
            closeLightbox();
        }
    });

    // 4. KEYBOARD NAVIGATION LISTENERS
    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('open')) return;

        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowRight') {
            showPhoto(currentIndex + 1);
        } else if (event.key === 'ArrowLeft') {
            showPhoto(currentIndex - 1);
        }
    });

    // 5. MOBILE TOUCH SWIPE GESTURES
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        // Trigger navigation if swipe distance is > 40px
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                showPhoto(currentIndex + 1);
            } else {
                showPhoto(currentIndex - 1);
            }
        }
    }, { passive: true });
};
