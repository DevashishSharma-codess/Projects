/**
 * Module 5: Dynamic Inspectable Photo Carousel
 */
export const initCarousel = () => {
    const carousel = document.getElementById('carousel');
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');

    if (!track || !prevBtn || !nextBtn || !dotsWrap || !carousel) return;

    const slides = Array.from(track.querySelectorAll('img'));
    if (slides.length === 0) return;

    let currentStep = 0;
    let autoPlayTimer;
    let itemsPerSlide = 3;

    const getItemsPerSlide = () => {
        const attrVal = carousel.getAttribute('data-items-per-slide');
        if (attrVal && !isNaN(parseInt(attrVal, 10))) {
            return Math.max(1, Math.min(slides.length, parseInt(attrVal, 10)));
        }

        const cssVar = getComputedStyle(carousel).getPropertyValue('--items-per-slide').trim();
        if (cssVar && !isNaN(parseInt(cssVar, 10))) {
            return Math.max(1, Math.min(slides.length, parseInt(cssVar, 10)));
        }

        return 3;
    };

    const updateLayout = () => {
        itemsPerSlide = getItemsPerSlide();
        carousel.style.setProperty('--items-per-slide', itemsPerSlide);

        const totalPages = Math.ceil(slides.length / itemsPerSlide);
        if (currentStep >= totalPages) {
            currentStep = totalPages - 1;
        }
        if (currentStep < 0) currentStep = 0;

        dotsWrap.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === currentStep ? 'active' : ''}`;
            dot.addEventListener('click', () => goToStep(i));
            dotsWrap.appendChild(dot);
        }

        renderSlide();
    };

    const renderSlide = () => {
        const totalPages = Math.ceil(slides.length / itemsPerSlide);
        const dots = Array.from(dotsWrap.children);

        const gap = 14;
        const containerWidth = carousel.clientWidth;
        const itemWidth = (containerWidth - (itemsPerSlide - 1) * gap) / itemsPerSlide;
        const shiftAmount = (itemWidth + gap) * itemsPerSlide * currentStep;

        track.style.transform = `translateX(-${shiftAmount}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentStep);
        });
    };

    const goToStep = (index) => {
        const totalPages = Math.ceil(slides.length / itemsPerSlide);
        currentStep = (index + totalPages) % totalPages;
        renderSlide();
        resetAutoPlay();
    };

    const nextSlide = () => goToStep(currentStep + 1);
    const prevSlide = () => goToStep(currentStep - 1);

    const resetAutoPlay = () => {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(nextSlide, 5000);
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    carousel.addEventListener('mouseleave', resetAutoPlay);

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    }, { passive: true });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && (mutation.attributeName === 'data-items-per-slide' || mutation.attributeName === 'style')) {
                updateLayout();
            }
        });
    });

    observer.observe(carousel, {
        attributes: true,
        attributeFilter: ['data-items-per-slide', 'style']
    });

    window.addEventListener('resize', updateLayout);

    updateLayout();
    resetAutoPlay();
};
