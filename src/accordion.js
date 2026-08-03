/**
 * Module 7: FAQ Accordion Component
 */
export const initAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        const answer = item.querySelector('.faq-a');

        if (!question || !answer) return;

        question.setAttribute('aria-expanded', 'false');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            faqItems.forEach(other => {
                other.classList.remove('open');
                const otherQuestion = other.querySelector('.faq-q');
                const otherAnswer = other.querySelector('.faq-a');
                if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    window.addEventListener('resize', () => {
        faqItems.forEach(item => {
            if (item.classList.contains('open')) {
                const answer = item.querySelector('.faq-a');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
};
