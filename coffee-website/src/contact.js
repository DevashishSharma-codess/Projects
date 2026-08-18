/**
 * Contact Form Module
 * Handles client-side form validation for Name, Email, and Message fields,
 * and includes a hidden honeypot field check to block automated spam bots.
 */
export const initContactForm = () => {
    // 1. SELECT FORM AND INPUT DOM ELEMENTS
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const honeypotInput = document.getElementById('website');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper to display error message text
    function setError(element, message) {
        if (element) {
            element.textContent = message;
        }
    }

    // 2. FIELD VALIDATION FUNCTIONS
    function validateName() {
        if (!nameInput || !nameInput.value.trim()) {
            setError(nameError, 'Please enter your name.');
            return false;
        }
        setError(nameError, '');
        return true;
    }

    function validateEmail() {
        if (!emailInput) return false;
        const value = emailInput.value.trim();

        if (!value) {
            setError(emailError, 'Please enter your email.');
            return false;
        }
        if (!emailPattern.test(value)) {
            setError(emailError, 'Please enter a valid email address.');
            return false;
        }
        setError(emailError, '');
        return true;
    }

    function validateMessage() {
        if (!messageInput || !messageInput.value.trim()) {
            setError(messageError, 'Please enter a message.');
            return false;
        }
        setError(messageError, '');
        return true;
    }

    // 3. ATTACH BLUR AND INPUT EVENT LISTENERS FOR INSTANT VALIDATION
    if (nameInput) {
        nameInput.addEventListener('blur', validateName);
        nameInput.addEventListener('input', () => {
            if (nameError && nameError.textContent) validateName();
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', () => {
            if (emailError && emailError.textContent) validateEmail();
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', validateMessage);
        messageInput.addEventListener('input', () => {
            if (messageError && messageError.textContent) validateMessage();
        });
    }

    // 4. HANDLE FORM SUBMISSION & HONEYPOT SPAM CHECK
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (formStatus) {
            formStatus.style.color = '';
            formStatus.textContent = '';
        }

        // HONEYPOT CHECK FOR BOTS:
        // If hidden 'website' input has text, it was filled by a spam bot.
        // Fake success message and exit immediately without sending real data.
        if (honeypotInput && honeypotInput.value.trim() !== '') {
            if (formStatus) {
                formStatus.style.color = '#5ec45e';
                formStatus.textContent = 'Thanks! Your message has been sent.';
            }
            contactForm.reset();
            return;
        }

        // Validate human user input fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Simulate network send delay
            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.color = '#5ec45e';
                    formStatus.textContent = 'Thanks, ' + nameInput.value.trim() + '! Your message has been sent.';
                }
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            }, 800);
        } else if (formStatus) {
            formStatus.style.color = '#e66a5e';
            formStatus.textContent = 'Please fix the errors above and try again.';
        }
    });
};
