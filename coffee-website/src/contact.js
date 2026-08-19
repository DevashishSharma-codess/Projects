/**
 * BASIC CONTACT FORM MODULE
 * Handles simple form validation and honeypot bot checking on submit.
 */
export const initContactForm = () => {
    // 1. Grab the form and its fields
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const honeypot = document.getElementById('website');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 2. Listen for when the user clicks "Send Message"
    form.addEventListener('submit', (event) => {
        // Prevent the page from reloading
        event.preventDefault();

        // Clear out old error texts and status messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formStatus.textContent = '';

        // 3. HONEYPOT BOT CHECK
        // If the hidden website input has text, a spam bot filled it out. 
        // We pretend it worked to trick the bot and stop right there.
        if (honeypot && honeypot.value.trim() !== '') {
            formStatus.style.color = '#5ec45e';
            formStatus.textContent = 'Thanks! Your message has been sent.';
            form.reset();
            return;
        }

        let isValid = true;

        // 4. BASIC FIELD VALIDATION
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your name.';
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            emailError.textContent = 'Please enter your email.';
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            messageError.textContent = 'Please enter a message.';
            isValid = false;
        }

        // 5. FINAL RESULT
        if (isValid) {
            formStatus.style.color = '#5ec45e';
            formStatus.textContent = 'Thanks! Your message has been sent successfully.';
            form.reset(); // Clears the form fields
        } else {
            formStatus.style.color = '#e66a5e';
            formStatus.textContent = 'Please fix the errors above.';
        }
    });
};
