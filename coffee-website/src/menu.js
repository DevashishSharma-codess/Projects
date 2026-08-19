/**
 * MENU TABS SYSTEM
 * Handles filtering the menu (Coffee, Pastries, etc.) when clicking tabs.
 */
export const initMenuTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // 1. FILTER HELPER FUNCTION
    // We create a reusable function that hides or shows cards based on their category
    function filterCards(categoryToFind) {
        menuItems.forEach((item) => {
            // If the card's tag matches the category we are looking for...
            if (item.getAttribute('data-cat') === categoryToFind) {
                item.style.display = 'block'; // Show it
                item.style.opacity = '1';     // Make it fully visible
            } else {
                item.style.display = 'none';  
                item.style.opacity = '0';     // Make it invisible
            }
        });
    }

    // 2. WHEN A USER CLICKS A TAB
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Remove the glowing 'active' color from ALL buttons first
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            // Add the 'active' glow ONLY to the button that was just clicked
            button.classList.add('active');

            // Find the hidden category name on the clicked button, and filter the cards
            filterCards(button.getAttribute('data-cat'));
        });
    });

    
    // When the website first opens, find the tab that is glowing by default
    const startingTab = document.querySelector('.tab-btn.active');
    if (startingTab) {
        // Immediately filter the cards so it doesn't show everything at once
        filterCards(startingTab.getAttribute('data-cat'));
    }
};


/**
 * BASIC TICK & ORDER SYSTEM
 * Handles clicking a card to tick it, revealing the Order button, and showing the Toast.
 */
export const initMenuOrdering = () => {
    
    // 1. Inject the Order button and Toast into the page automatically
    document.body.insertAdjacentHTML('beforeend', `
        <button id="simpleOrderBtn" class="simple-order-btn">Order Now</button>
        <div id="toastNotification" class="toast-notification">Order Placed!</div>
    `);

    // 2. Grab references to the elements
    const orderBtn = document.getElementById('simpleOrderBtn');
    const toast = document.getElementById('toastNotification');
    const menuItems = document.querySelectorAll('.menu-item.guest-check');

    // 3. When a user clicks a menu card
    menuItems.forEach((card) => {
        card.addEventListener('click', () => {
            // Toggle the highlight on the card and check the box
            card.classList.toggle('selected');
            card.querySelector('.check-box').classList.toggle('checked');

            // Show the "Order Now" button the moment anything is clicked
            orderBtn.classList.add('show');
        });
    });

    // 4. When the user clicks "Order Now"
    orderBtn.addEventListener('click', () => {
        // Hide the button
        orderBtn.classList.remove('show');
        
        // Show the success toast message
        toast.classList.add('show');
        
        // Wait 3 seconds (3000ms), then hide the toast message
        setTimeout(() => toast.classList.remove('show'), 3000);

        // Reset all the cards back to normal
        menuItems.forEach((card) => {
            card.classList.remove('selected');
            card.querySelector('.check-box').classList.remove('checked');
        });
    });
};
