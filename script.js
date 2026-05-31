// ===== MENU OVERLAY =====
const menuButton = document.querySelector('.mobile-menu-button');
const menuOverlay = document.querySelector('.menu-overlay');
const closeMenuButton = document.querySelector('.menu-overlay-top button');

if (menuButton) {
    menuButton.addEventListener('click', function() {
        menuOverlay.style.display = 'block';
    });
}

if (closeMenuButton) {
    closeMenuButton.addEventListener('click', function() {
        menuOverlay.style.display = 'none';
    });
}

// =============

// ===== DROPDOWN TOGGLES (Product pages) =====
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function(dropdown) {
    const button = dropdown.querySelector('button');
    const content = dropdown.querySelector('.hidden-content');

    if (button && content) {
        button.addEventListener('click', function() {
            // Close all other dropdowns first
            dropdowns.forEach(function(other) {
                if (other !== dropdown) {
                    other.querySelector('.hidden-content').classList.remove('active');
                }
            });
            // Toggle this one
            content.classList.toggle('active');
        });
    }
});

// ===== ADD TO BAG + CART NOTIFICATION =====
const addToBagButton = document.querySelector('.cart-actions > button');
const cartNotification = document.getElementById('cart-notification');

if (addToBagButton && cartNotification) {
    addToBagButton.addEventListener('click', function() {
        cartNotification.classList.add('active');

        // Auto hide after 3 seconds
        setTimeout(function() {
            cartNotification.classList.remove('active');
        }, 3000);
    });
}