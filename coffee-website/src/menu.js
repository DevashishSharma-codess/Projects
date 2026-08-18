/**
 * Menu & Order System Module
 * Manages category tab filtering (Coffee, Pastries, Extras), guest check item selection,
 * quantity selectors (+/-), floating order summary bar, checkout modal, and toast alerts.
 */
export const initMenuTabs = () => {
    // 1. SELECT DOM ELEMENTS FOR TABS
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // 2. FILTER MENU ITEMS BY CATEGORY
    function filterCategory(category) {
        menuItems.forEach((item) => {
            const itemCategory = item.dataset.cat;
            const matches = !itemCategory || itemCategory === category;
            if (matches) {
                item.style.display = '';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }

    // 3. ATTACH CLICK LISTENERS TO TAB BUTTONS
    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            filterCategory(btn.dataset.cat);
        });
    });

    // 4. FILTER BY DEFAULT ACTIVE TAB ON INITIAL LOAD
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        filterCategory(activeTab.dataset.cat);
    }
};

export const initMenuOrdering = () => {
    // 1. SELECT ORDERING DOM ELEMENTS
    const menuItems = document.querySelectorAll('.menu-item.guest-check');

    // 2. CREATE FLOATING DOM UI COMPONENTS IF MISSING
    // Toast Notification Element
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

    // Floating Order Summary Bar Element
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

    // Checkout Modal Popup Element
    let checkoutModal = document.getElementById('orderModal');
    if (!checkoutModal) {
        checkoutModal = document.createElement('div');
        checkoutModal.id = 'orderModal';
        checkoutModal.className = 'order-modal';
        checkoutModal.innerHTML = `
            <div class="order-modal-card">
                <div class="order-modal-header">
                    <h3>Your Order Summary</h3>
                    <button class="order-modal-close" id="orderModalClose">&times;</button>
                </div>
                <div class="order-modal-list" id="orderModalList"></div>
                <div class="order-modal-footer">
                    <div class="order-modal-total-line">
                        <span>Total</span>
                        <span id="orderModalTotal">$0.00</span>
                    </div>
                    <button type="button" id="btnConfirmCheckout" class="btn-confirm-checkout">Confirm & Place Order</button>
                </div>
            </div>
        `;
        document.body.appendChild(checkoutModal);
    }

    // 3. GET REFERENCES TO CREATED UI ELEMENTS
    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');
    const orderBarCount = document.getElementById('orderBarCount');
    const orderBarTotal = document.getElementById('orderBarTotal');
    const btnOrderNowOverall = document.getElementById('btnOrderNowOverall');
    const orderModalClose = document.getElementById('orderModalClose');
    const orderModalList = document.getElementById('orderModalList');
    const orderModalTotal = document.getElementById('orderModalTotal');
    const btnConfirmCheckout = document.getElementById('btnConfirmCheckout');
    let toastTimeout = null;

    // Helper to show alert toast message
    function showToast(message) {
        if (!toast) return;
        toastMessage.textContent = message;
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

    // 4. CALCULATE SELECTED ITEMS & SUMMARY TOTALS
    function getSelectedItems() {
        const selectedList = [];
        menuItems.forEach((item) => {
            if (item.classList.contains('selected')) {
                const titleEl = item.querySelector('h3');
                const title = titleEl ? titleEl.textContent.trim() : 'Menu Item';
                const qtyEl = item.querySelector('.qty-count');
                const priceEl = item.querySelector('.price');
                const qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
                const price = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0 : 0;
                selectedList.push({ item, title, qty, price, subtotal: price * qty });
            }
        });
        return selectedList;
    }

    function updateOverallSummary() {
        const selectedItems = getSelectedItems();
        let totalCount = 0;
        let totalPrice = 0;

        selectedItems.forEach((item) => {
            totalCount += item.qty;
            totalPrice += item.subtotal;
        });

        if (totalCount > 0) {
            if (orderBarCount) {
                orderBarCount.textContent = totalCount + (totalCount > 1 ? ' items' : ' item');
            }
            if (orderBarTotal) {
                orderBarTotal.textContent = '$' + totalPrice.toFixed(2);
            }
            if (orderBar) {
                orderBar.classList.add('show');
            }
        } else if (orderBar) {
            orderBar.classList.remove('show');
        }
    }

    // 5. ATTACH CARD SELECTION & QUANTITY SELECTOR LISTENERS (+/-)
    menuItems.forEach((item) => {
        const checkBox = item.querySelector('.check-box');
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
        }

        const qtyCountEl = controls.querySelector('.qty-count');
        const btnMinus = controls.querySelector('.qty-minus');
        const btnPlus = controls.querySelector('.qty-plus');
        let qty = 1;

        // Toggle card selection state on click
        item.addEventListener('click', (event) => {
            if (event.target.closest('.qty-btn')) return;

            const isSelected = item.classList.toggle('selected');
            if (checkBox) {
                checkBox.classList.toggle('checked', isSelected);
            }
            if (!isSelected) {
                qty = 1;
                if (qtyCountEl) qtyCountEl.textContent = '1';
            }
            updateOverallSummary();
        });

        // Decrease quantity listener
        if (btnMinus) {
            btnMinus.addEventListener('click', (event) => {
                event.stopPropagation();
                if (qty > 1) {
                    qty--;
                    if (qtyCountEl) qtyCountEl.textContent = String(qty);
                    updateOverallSummary();
                }
            });
        }

        // Increase quantity listener
        if (btnPlus) {
            btnPlus.addEventListener('click', (event) => {
                event.stopPropagation();
                if (!item.classList.contains('selected')) {
                    item.classList.add('selected');
                    if (checkBox) checkBox.classList.add('checked');
                }
                if (qty < 20) {
                    qty++;
                    if (qtyCountEl) qtyCountEl.textContent = String(qty);
                    updateOverallSummary();
                }
            });
        }
    });

    // 6. CHECKOUT MODAL OPEN AND CONFIRM LISTENERS
    if (btnOrderNowOverall && checkoutModal) {
        btnOrderNowOverall.addEventListener('click', () => {
            const selectedItems = getSelectedItems();
            if (selectedItems.length === 0) return;

            orderModalList.innerHTML = '';
            let total = 0;

            selectedItems.forEach((item) => {
                total += item.subtotal;
                const row = document.createElement('div');
                row.className = 'order-modal-item';
                row.innerHTML = '<span>' + item.title + ' &times; ' + item.qty + '</span><span>$' + item.subtotal.toFixed(2) + '</span>';
                orderModalList.appendChild(row);
            });

            if (orderModalTotal) {
                orderModalTotal.textContent = '$' + total.toFixed(2);
            }
            checkoutModal.classList.add('open');
        });
    }

    function closeCheckoutModal() {
        if (checkoutModal) {
            checkoutModal.classList.remove('open');
        }
    }

    if (orderModalClose) {
        orderModalClose.addEventListener('click', closeCheckoutModal);
    }

    if (checkoutModal) {
        checkoutModal.addEventListener('click', (event) => {
            if (event.target === checkoutModal) {
                closeCheckoutModal();
            }
        });
    }

    if (btnConfirmCheckout) {
        btnConfirmCheckout.addEventListener('click', () => {
            const selectedItems = getSelectedItems();
            let totalCount = 0;
            let totalPrice = 0;

            selectedItems.forEach((item) => {
                totalCount += item.qty;
                totalPrice += item.subtotal;
                item.item.classList.remove('selected');
                const cb = item.item.querySelector('.check-box');
                if (cb) cb.classList.remove('checked');
                const qtyEl = item.item.querySelector('.qty-count');
                if (qtyEl) qtyEl.textContent = '1';
            });

            closeCheckoutModal();
            if (orderBar) orderBar.classList.remove('show');
            showToast('Order Placed! ' + totalCount + (totalCount > 1 ? ' items' : ' item') + ' ($' + totalPrice.toFixed(2) + ')');
        });
    }
};
