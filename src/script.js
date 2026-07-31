document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       0. PRELOADER FADE-OUT & LOTTIE INITIALIZATION
    ============================================================ */
    const pageLoader = document.getElementById('pageLoader');
    const lottiePlayer = document.getElementById('lottiePlayer');

    if (lottiePlayer) {
        lottiePlayer.addEventListener('ready', () => {
            lottiePlayer.seek(0);
            lottiePlayer.play();
        });
    }

    if (pageLoader) {
        const hideLoader = () => {
            pageLoader.classList.add('hidden');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 650);
        };

        if (document.readyState === 'complete') {
            setTimeout(hideLoader, 1400);
        } else {
            window.addEventListener('load', () => setTimeout(hideLoader, 1400));
            setTimeout(hideLoader, 2500);
        }
    }

    /* ============================================================
       1. MOBILE NAV TOGGLE
    ============================================================ */
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navList.style.display === 'flex';
            navList.style.display = isOpen ? 'none' : 'flex';
        });

        // Close mobile menu after clicking a link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 700) {
                    navList.style.display = 'none';
                }
            });
        });

        // Reset inline display when resizing back to desktop screen
        window.addEventListener('resize', () => {
            if (window.innerWidth > 700) {
                navList.style.display = '';
            }
        });
    }

    // Ensure all hero bento videos autoplay smoothly
    const heroVideos = document.querySelectorAll('.hero-bento-grid video');
    heroVideos.forEach(v => {
        v.muted = true;
        v.play().catch(() => { });
    });

    /* ============================================================
       2. CAROUSEL
    ============================================================ */
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');

    if (track && prevBtn && nextBtn && dotsWrap) {
        const slides = Array.from(track.children);
        let current = 0;
        let autoPlayTimer;

        // Build dots
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsWrap.appendChild(dot);
        });

        const dots = Array.from(dotsWrap.children);

        function updateSlide() {
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
        }

        function goToSlide(index) {
            current = (index + slides.length) % slides.length;
            updateSlide();
            resetAutoPlay();
        }

        function nextSlide() {
            goToSlide(current + 1);
        }

        function prevSlide() {
            goToSlide(current - 1);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(nextSlide, 5000);
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Basic swipe support for touch devices
        let touchStartX = 0;
        track.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });
        track.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                diff > 0 ? nextSlide() : prevSlide();
            }
        });

        resetAutoPlay();
    }

    /* ============================================================
       3. MENU TABS
    ============================================================ */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    function filterCategory(category) {
        menuItems.forEach(item => {
            const itemCategory = item.dataset.cat;
            const matches = !itemCategory || itemCategory === category;
            item.style.display = matches ? '' : 'none';
        });
    }

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterCategory(btn.dataset.cat);
            });
        });

        // Initialize display based on active tab on page load
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            filterCategory(activeTab.dataset.cat);
        }
    }

    /* ============================================================
       4. GALLERY LIGHTBOX
    ============================================================ */
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (galleryGrid && lightbox && lightboxImg && lightboxClose) {
        galleryGrid.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('open');
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('open');
            lightboxImg.src = '';
        }

        lightboxClose.addEventListener('click', closeLightbox);

        // Close when clicking the dark backdrop (not the image itself)
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });

        // Close on Escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }

    /* ============================================================
       5. FAQ ACCORDION
    ============================================================ */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        const answer = item.querySelector('.faq-a');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all other FAQ items (accordion behaviour)
            faqItems.forEach(other => {
                other.classList.remove('open');
                other.querySelector('.faq-a').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ============================================================
       6. CONTACT FORM (mock validation + submission)
    ============================================================ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const honeypotInput = document.getElementById('website');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const formStatus = document.getElementById('formStatus');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function setError(el, message) {
            el.textContent = message;
        }

        function validateName() {
            if (!nameInput.value.trim()) {
                setError(nameError, 'Please enter your name.');
                return false;
            }
            setError(nameError, '');
            return true;
        }

        function validateEmail() {
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
            if (!messageInput.value.trim()) {
                setError(messageError, 'Please enter a message.');
                return false;
            }
            setError(messageError, '');
            return true;
        }

        // Validate on blur for immediate feedback
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        messageInput.addEventListener('blur', validateMessage);

        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            formStatus.style.color = '';
            formStatus.textContent = '';

            // Honeypot Check: If the honeypot field is filled, it's a bot!
            if (honeypotInput && honeypotInput.value.trim() !== '') {
                console.warn('Bot detected: Honeypot field was filled.');
                // Show fake success message to fool the bot without processing/sending data
                formStatus.style.color = '#3a6b3a';
                formStatus.textContent = 'Thanks! Your message has been sent.';
                contactForm.reset();
                return;
            }

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                // Mock submission — no backend, just a friendly confirmation
                formStatus.style.color = '#3a6b3a';
                formStatus.textContent = `Thanks, ${nameInput.value.trim()}! Your message has been sent.`;
                contactForm.reset();
            } else {
                formStatus.style.color = '#b3453b';
                formStatus.textContent = 'Please fix the errors above and try again.';
            }
        });
    }

    /* ============================================================
       7. MENU ITEM ORDERING & TOAST NOTIFICATION
    ============================================================ */
    function initMenuOrdering() {
        const menuItems = document.querySelectorAll('.menu-item.guest-check');

        // Create Toast element if not already present in DOM
        let toast = document.getElementById('toastNotification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastNotification';
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <span class="toast-icon">✓</span>
                <span class="toast-message" id="toastMessage">Order accepted!</span>
                <button class="toast-close" id="toastClose" aria-label="Close">&times;</button>
            `;
            document.body.appendChild(toast);
        }

        // Create Floating Overall Order Bar if not present
        let orderBar = document.getElementById('floatingOrderBar');
        if (!orderBar) {
            orderBar = document.createElement('div');
            orderBar.id = 'floatingOrderBar';
            orderBar.className = 'floating-order-bar';
            orderBar.innerHTML = `
                <div class="order-bar-info">
                    <span class="order-bar-count" id="orderBarCount">0 items</span>
                    <span class="order-bar-dot">&middot;</span>
                    <span class="order-bar-total" id="orderBarTotal">$0.00</span>
                </div>
                <button type="button" id="btnOrderNowOverall" class="btn-order-now-main">Order Now</button>
            `;
            document.body.appendChild(orderBar);
        }

        const toastMessage = document.getElementById('toastMessage');
        const toastClose = document.getElementById('toastClose');
        const orderBarCount = document.getElementById('orderBarCount');
        const orderBarTotal = document.getElementById('orderBarTotal');
        const btnOrderNowOverall = document.getElementById('btnOrderNowOverall');
        let toastTimeout;

        function showToast(msg) {
            if (!toast) return;
            toastMessage.textContent = msg;
            toast.classList.add('show');

            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }

        if (toastClose) {
            toastClose.addEventListener('click', () => {
                toast.classList.remove('show');
            });
        }

        function updateOverallSummary() {
            let totalCount = 0;
            let totalPrice = 0;

            menuItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    const qtyEl = item.querySelector('.qty-count');
                    const priceEl = item.querySelector('.price');
                    const qty = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
                    const price = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0 : 0;

                    totalCount += qty;
                    totalPrice += price * qty;
                }
            });

            if (totalCount > 0) {
                orderBarCount.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
                orderBarTotal.textContent = `$${totalPrice.toFixed(2)}`;
                orderBar.classList.add('show');
            } else {
                orderBar.classList.remove('show');
            }
        }

        menuItems.forEach(item => {
            const checkBox = item.querySelector('.check-box');

            // Inject quantity controls only into card
            let controls = item.querySelector('.item-order-controls');
            if (!controls) {
                controls = document.createElement('div');
                controls.className = 'item-order-controls';
                controls.innerHTML = `
                    <div class="qty-selector">
                        <button type="button" class="qty-btn qty-minus" aria-label="Decrease quantity">-</button>
                        <span class="qty-count">1</span>
                        <button type="button" class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
                    </div>
                `;
                item.appendChild(controls);
            } else {
                // If it already had order button inside, replace content with quantity selector only
                controls.innerHTML = `
                    <div class="qty-selector">
                        <button type="button" class="qty-btn qty-minus" aria-label="Decrease quantity">-</button>
                        <span class="qty-count">1</span>
                        <button type="button" class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
                    </div>
                `;
            }

            const qtyCountEl = controls.querySelector('.qty-count');
            const btnMinus = controls.querySelector('.qty-minus');
            const btnPlus = controls.querySelector('.qty-plus');

            let qty = 1;

            const toggleCheck = (e) => {
                e.stopPropagation();
                const isSelected = item.classList.toggle('selected');
                if (checkBox) {
                    checkBox.classList.toggle('checked', isSelected);
                }
                if (!isSelected) {
                    qty = 1;
                    qtyCountEl.textContent = qty;
                }
                updateOverallSummary();
            };

            if (checkBox) {
                checkBox.addEventListener('click', toggleCheck);
            }

            const titleWrap = item.querySelector('.item-title-wrap');
            if (titleWrap) {
                titleWrap.style.cursor = 'pointer';
                titleWrap.addEventListener('click', toggleCheck);
            }

            btnMinus.addEventListener('click', (e) => {
                e.stopPropagation();
                if (qty > 1) {
                    qty--;
                    qtyCountEl.textContent = qty;
                    updateOverallSummary();
                }
            });

            btnPlus.addEventListener('click', (e) => {
                e.stopPropagation();
                if (qty < 20) {
                    qty++;
                    qtyCountEl.textContent = qty;
                    updateOverallSummary();
                }
            });
        });

        // Single overall Order Now button event listener
        if (btnOrderNowOverall) {
            btnOrderNowOverall.addEventListener('click', () => {
                let totalCount = 0;
                let totalPrice = 0;

                menuItems.forEach(item => {
                    if (item.classList.contains('selected')) {
                        const qtyEl = item.querySelector('.qty-count');
                        const priceEl = item.querySelector('.price');
                        const qty = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
                        const price = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0 : 0;

                        totalCount += qty;
                        totalPrice += price * qty;

                        // Reset selection on card
                        item.classList.remove('selected');
                        const cb = item.querySelector('.check-box');
                        if (cb) cb.classList.remove('checked');
                        if (qtyEl) qtyEl.textContent = '1';
                    }
                });

                if (totalCount > 0) {
                    showToast(`Order Accepted! ${totalCount} item${totalCount > 1 ? 's' : ''} ($${totalPrice.toFixed(2)})`);
                    orderBar.classList.remove('show');
                }
            });
        }
    }

    initMenuOrdering();

});