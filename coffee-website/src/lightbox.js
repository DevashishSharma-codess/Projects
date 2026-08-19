/**
 * BASIC IMAGE LIGHTBOX MODULE
 * Opens clicked images in a clean popup modal with simple next/prev controls.
 */
export const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const images = document.querySelectorAll('#galleryGrid img, #carouselTrack img');

    if (!lightbox || !lightboxImg || images.length === 0) return;

    let currentIndex = 0;

    const showImage = (index) => {
        if (index < 0) {
            currentIndex = images.length - 1;
        } else if (index >= images.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        lightboxImg.src = images[currentIndex].src;
        lightbox.classList.add('open');
    };

    // Loop through every single image found on the webpage
    images.forEach((img, index) => {
        // Change the mouse cursor to a pointing hand when hovering over any image
        img.style.cursor = 'pointer';

        // Listen for a mouse click on this specific image card
        img.addEventListener('click', (event) => {
            event.stopPropagation();
            showImage(index);
        });
    });

    // Listen for a click on the close button
    closeBtn?.addEventListener('click', () => {
        lightbox.classList.remove('open');
    });

    // Listen for a click on the previous arrow button
    prevBtn?.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    // Listen for a click on the next arrow button
    nextBtn?.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    // Listen for clicks anywhere on the full-screen lightbox container
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target.classList.contains('lightbox-img-wrap')) {
            lightbox.classList.remove('open');
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('open')) return;
        if (event.key === 'Escape') lightbox.classList.remove('open');
        if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
};
