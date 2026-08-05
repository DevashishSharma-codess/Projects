/**
 * Module 4: Menu Filtering, Card Selection & Checkout Order Bar
 */
export const initMenuTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    const filterCategory = (category) => {
        menuItems.forEach(item => {
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
    };

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterCategory(btn.dataset.cat);
            });
        });

        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            filterCategory(activeTab.dataset.cat);
        }
    }
};

export const initMenuOrdering = () => {
    const menuItems = document.querySelectorAll('.menu-item.guest-check');

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

    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');
    const orderBarCount = document.getElementById('orderBarCount');
    const orderBarTotal = document.getElementById('orderBarTotal');
    const btnOrderNowOverall = document.getElementById('btnOrderNowOverall');
    const orderModalClose = document.getElementById('orderModalClose');
    const orderModalList = document.getElementById('orderModalList');
    const orderModalTotal = document.getElementById('orderModalTotal');
    const btnConfirmCheckout = document.getElementById('btnConfirmCheckout');
    let toastTimeout;

    const showToast = (msg) => {
        if (!toast) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    };

    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

    const getSelectedItems = () => {
        const selectedList = [];
        menuItems.forEach(item => {
            if (item.classList.contains('selected')) {
                const title = item.querySelector('h3')?.textContent.trim() || 'Menu Item';
                const qtyEl = item.querySelector('.qty-count');
                const priceEl = item.querySelector('.price');
                const qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
                const price = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0 : 0;
                selectedList.push({ item, title, qty, price, subtotal: price * qty });
            }
        });
        return selectedList;
    };

    const updateOverallSummary = () => {
        const selectedItems = getSelectedItems();
        let totalCount = 0;
        let totalPrice = 0;

        selectedItems.forEach(i => {
            totalCount += i.qty;
            totalPrice += i.subtotal;
        });

        if (totalCount > 0) {
            if (orderBarCount) orderBarCount.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
            if (orderBarTotal) orderBarTotal.textContent = `$${totalPrice.toFixed(2)}`;
            if (orderBar) orderBar.classList.add('show');
        } else {
            if (orderBar) orderBar.classList.remove('show');
        }
    };

    menuItems.forEach(item => {
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

        item.addEventListener('click', (e) => {
            if (e.target.closest('.qty-btn')) return;

            const isSelected = item.classList.toggle('selected');
            if (checkBox) {
                checkBox.classList.toggle('checked', isSelected);
            }
            if (!isSelected) {
                qty = 1;
                if (qtyCountEl) qtyCountEl.textContent = qty;
            }
            updateOverallSummary();
        });

        if (btnMinus) {
            btnMinus.addEventListener('click', (e) => {
                e.stopPropagation();
                if (qty > 1) {
                    qty--;
                    if (qtyCountEl) qtyCountEl.textContent = qty;
                    updateOverallSummary();
                }
            });
        }

        if (btnPlus) {
            btnPlus.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!item.classList.contains('selected')) {
                    item.classList.add('selected');
                    if (checkBox) checkBox.classList.add('checked');
                }
                if (qty < 20) {
                    qty++;
                    if (qtyCountEl) qtyCountEl.textContent = qty;
                    updateOverallSummary();
                }
            });
        }
    });

    if (btnOrderNowOverall && checkoutModal) {
        btnOrderNowOverall.addEventListener('click', () => {
            const selectedItems = getSelectedItems();
            if (selectedItems.length === 0) return;

            orderModalList.innerHTML = '';
            let total = 0;

            selectedItems.forEach(i => {
                total += i.subtotal;
                const row = document.createElement('div');
                row.className = 'order-modal-item';
                row.innerHTML = `
                    <span>${i.title} &times; ${i.qty}</span>
                    <span>$${i.subtotal.toFixed(2)}</span>
                `;
                orderModalList.appendChild(row);
            });

            if (orderModalTotal) orderModalTotal.textContent = `$${total.toFixed(2)}`;
            checkoutModal.classList.add('open');
        });
    }

    const closeCheckoutModal = () => {
        if (checkoutModal) checkoutModal.classList.remove('open');
    };

    if (orderModalClose) {
        orderModalClose.addEventListener('click', closeCheckoutModal);
    }

    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) closeCheckoutModal();
        });
    }

    if (btnConfirmCheckout) {
        btnConfirmCheckout.addEventListener('click', () => {
            const selectedItems = getSelectedItems();
            let totalCount = 0;
            let totalPrice = 0;

            selectedItems.forEach(i => {
                totalCount += i.qty;
                totalPrice += i.subtotal;
                i.item.classList.remove('selected');
                const cb = i.item.querySelector('.check-box');
                if (cb) cb.classList.remove('checked');
                const qtyEl = i.item.querySelector('.qty-count');
                if (qtyEl) qtyEl.textContent = '1';
            });

            closeCheckoutModal();
            if (orderBar) orderBar.classList.remove('show');
            showToast(`Order Placed! ${totalCount} item${totalCount > 1 ? 's' : ''} ($${totalPrice.toFixed(2)})`);
        });
    }
};
