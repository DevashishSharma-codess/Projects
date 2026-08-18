/**
 * FAQ Accordion Module
 * Manages expandable question-answer rows in the FAQ section.
 * Ensures only one answer row is expanded at a time and calculates dynamic height.
 */
export const initAccordion = () => {
    // 1. SELECT ALL FAQ ACCORDION ITEMS
    const faqItems = document.querySelectorAll('.faq-item');

    // 2. ATTACH CLICK LISTENERS TO FAQ QUESTIONS
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-q');
        const answer = item.querySelector('.faq-a');

        if (!question || !answer) return;

        // Set initial accessibility state
        question.setAttribute('aria-expanded', 'false');

        // Toggle answer open or closed on question click
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all open accordion items on screen
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('open');

                const otherQ = otherItem.querySelector('.faq-q');
                const otherA = otherItem.querySelector('.faq-a');

                if (otherQ) {
                    otherQ.setAttribute('aria-expanded', 'false');
                }
                if (otherA) {
                    otherA.style.maxHeight = null;
                }
            });

            // Expand clicked item if it was previously closed
            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 3. RECALCULATE MAX-HEIGHT ON WINDOW RESIZE
    window.addEventListener('resize', () => {
        const openAnswer = document.querySelector('.faq-item.open .faq-a');
        if (openAnswer) {
            openAnswer.style.maxHeight = openAnswer.scrollHeight + 'px';
        }
    });
};
