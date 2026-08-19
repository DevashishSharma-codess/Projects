export const initCarousel = () => {
    const carousel = document.getElementById('carousel');
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');

    if (!carousel || !track || !prevBtn || !nextBtn || !dotsWrap) return;

    const slides = track.querySelectorAll('img');
    let currentIndex = 0;
    let timer = null;

    // 1. Is it mobile? Return 1 image per slide, otherwise 3 for desktop.
    const getItems = () => (window.innerWidth <= 768 ? 1 : 3);

    // 2. Main Movement Function
    const goToPage = (index) => {
        const items = getItems();
        const totalPages = Math.ceil(slides.length / items);

        // Loop around if we hit the boundaries
        if (index < 0) currentIndex = totalPages - 1;
        else if (index >= totalPages) currentIndex = 0;
        else currentIndex = index;

        // Calculate pixel shift and slide the track
        const gap = 14;
        const width = carousel.clientWidth;
        const itemWidth = (width - (items - 1) * gap) / items;
        track.style.transform = `translateX(-${(itemWidth + gap) * items * currentIndex}px)`;

        // Highlight the correct dot
        dotsWrap.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        resetTimer();
    };

    // 3. Setup Layout & Build Dots
    const setupCarousel = () => {
        const items = getItems();
        carousel.style.setProperty('--items-per-slide', items);
        const totalPages = Math.ceil(slides.length / items);

     

        // Clear and rebuild dots container
      // 1. Clear out any old dots from the screen
dotsWrap.innerHTML = '';

// 2. Loop through the total number of pages
for (let i = 0; i < totalPages; i++) {
    
    // Create a new dot element
    const dot = document.createElement('div');
    
    // Set its style: if it's the current page, make it 'dot active', otherwise just 'dot'
    if (i === currentIndex) {
        dot.className = 'dot active';
    } else {
        dot.className = 'dot';
    }
    
    // When the user clicks this specific dot, jump to that page and reset the timer
    dot.addEventListener('click', () => {
        goToPage(i);
        resetTimer();
    });
    
    // Finally, place the dot onto the webpage inside the dots container
    dotsWrap.appendChild(dot);
}

    };

    // 4. Autoplay Timer
    const startTimer = () => {
        clearInterval(timer);
        timer = setInterval(() => goToPage(currentIndex + 1), 4000);
    };

    const resetTimer = () => {
        startTimer();
    };

    // 5. Event Listeners
    nextBtn.addEventListener('click', () => { goToPage(currentIndex + 1); resetTimer(); });
    prevBtn.addEventListener('click', () => { goToPage(currentIndex - 1); resetTimer(); });
    window.addEventListener('resize', setupCarousel);

    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', startTimer);

    // Initial Run
    setupCarousel();
    startTimer();
};