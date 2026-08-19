/**
 * BASIC FAQ ACCORDION MODULE
 * Toggles open/closed states when clicking FAQ question buttons.
 */
export const initAccordion = () => {
    // 1. Grab all FAQ item boxes on the page
    const faqItems = document.querySelectorAll('.faq-item');

    // 2. Loop through each FAQ item to set up click events
    faqItems.forEach((item) => {
        const questionBtn = item.querySelector('.faq-q');

        if (!questionBtn) return;

        // 3. When the question button is clicked
        questionBtn.addEventListener('click', () => {
            // Check if this specific item is already open
            const isOpen = item.classList.contains('open');

            // Close ALL FAQ items first so only one stays open at a time
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('open');
            });

            // If it wasn't open before, open this specific item container
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
};
