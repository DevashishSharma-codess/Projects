/**
 * Dynamic Inspectable Photo Carousel Module
 * Controls image carousel sliding, pagination dot updates, autoplay, and swipe gestures.
 */
export const initCarousel = () => {
    // 1. SELECT CAROUSEL DOM ELEMENTS
    const carousel = document.getElementById('carousel');
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');

    if (!carousel || !track || !prevBtn || !nextBtn || !dotsWrap) return;

    // Get array of all image slides inside track
    const slides = Array.from(track.querySelectorAll('img'));
    if (slides.length === 0) return;

    let currentStep = 0;
    let autoPlayTimer = null;
    let itemsPerSlide = 3;

    // Helper to calculate items per slide based on screen width or attributes
    function getItemsPerSlide() {
        const attrVal = parseInt(carousel.getAttribute('data-items-per-slide'), 10);
        if (!isNaN(attrVal)) {
            return Math.max(1, Math.min(slides.length, attrVal));
        }
        const cssVar = parseInt(getComputedStyle(carousel).getPropertyValue('--items-per-slide').trim(), 10);
        if (!isNaN(cssVar)) {
            return Math.max(1, Math.min(slides.length, cssVar));
        }
        return 3;
    }

    // Moves the track horizontally and updates active pagination dot
    function renderSlide() {
        const gap = 14;
        const containerWidth = carousel.clientWidth;
        const itemWidth = (containerWidth - (itemsPerSlide - 1) * gap) / itemsPerSlide;
        const shiftAmount = (itemWidth + gap) * itemsPerSlide * currentStep;

        // Apply horizontal CSS slide transform
        track.style.transform = 'translateX(-' + shiftAmount + 'px)';

        // Update dot highlights
        const dots = Array.from(dotsWrap.children);
        dots.forEach((dot, index) => {
            if (index === currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Re-calculates layout dimensions and rebuilds pagination dots
    function updateLayout() {
        itemsPerSlide = getItemsPerSlide();
        carousel.style.setProperty('--items-per-slide', itemsPerSlide);

        const totalPages = Math.ceil(slides.length / itemsPerSlide);
        if (currentStep >= totalPages) {
            currentStep = totalPages - 1;
        }
        if (currentStep < 0) {
            currentStep = 0;
        }

        // Generate pagination dot elements
        dotsWrap.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = i === currentStep ? 'dot active' : 'dot';
            dot.addEventListener('click', () => goToStep(i));
            dotsWrap.appendChild(dot);
        }

        renderSlide();
    }

    // Jumps to a specific page step index
    function goToStep(index) {
        const totalPages = Math.ceil(slides.length / itemsPerSlide);
        if (index < 0) {
            currentStep = totalPages - 1;
        } else if (index >= totalPages) {
            currentStep = 0;
        } else {
            currentStep = index;
        }
        renderSlide();
        resetAutoPlay();
    }

    // Move to next slide page
    function nextSlide() {
        goToStep(currentStep + 1);
    }

    // Move to previous slide page
    function prevSlide() {
        goToStep(currentStep - 1);
    }

    // Reset and restart 5-second automatic slide transition timer
    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    // Next and Previous arrow button click listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Pause autoplay on mouse hover, resume on mouse leave
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayTimer);
    });
    carousel.addEventListener('mouseleave', resetAutoPlay);

    // Touch swipe gesture support for mobile screens
    let touchStartX = 0;
    track.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        // If swipe distance is > 40px, change slide page
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });

    // Update carousel layout on window resize
    window.addEventListener('resize', updateLayout);

    // Initialize layout and start autoplay timer
    updateLayout();
    resetAutoPlay();
};
