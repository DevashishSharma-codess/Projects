/**
 * Module 8: Contact Form Validation & Honeypot Anti-Spam
 */
export const initContactForm = () => {
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

    const setError = (el, message) => {
        if (el) el.textContent = message;
    };

    const validateName = () => {
        if (!nameInput || !nameInput.value.trim()) {
            setError(nameError, 'Please enter your name.');
            return false;
        }
        setError(nameError, '');
        return true;
    };

    const validateEmail = () => {
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
    };

    const validateMessage = () => {
        if (!messageInput || !messageInput.value.trim()) {
            setError(messageError, 'Please enter a message.');
            return false;
        }
        setError(messageError, '');
        return true;
    };

    if (nameInput) {
        nameInput.addEventListener('blur', validateName);
        nameInput.addEventListener('input', () => { if (nameError && nameError.textContent) validateName(); });
    }
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', () => { if (emailError && emailError.textContent) validateEmail(); });
    }
    if (messageInput) {
        messageInput.addEventListener('blur', validateMessage);
        messageInput.addEventListener('input', () => { if (messageError && messageError.textContent) validateMessage(); });
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (formStatus) {
            formStatus.style.color = '';
            formStatus.textContent = '';
        }

        if (honeypotInput && honeypotInput.value.trim() !== '') {
            if (formStatus) {
                formStatus.style.color = '#5ec45e';
                formStatus.textContent = 'Thanks! Your message has been sent.';
            }
            contactForm.reset();
            return;
        }

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.color = '#5ec45e';
                    formStatus.textContent = `Thanks, ${nameInput.value.trim()}! Your message has been sent.`;
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
