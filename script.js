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

// ===== QUANTITY TOGGLE (Product pages) =====
const qtyNumber = document.getElementById('qty-number');
const qtyButtons = document.querySelectorAll('.qty-toggle button');

if (qtyNumber && qtyButtons.length === 2) {
    // Up button (first button)
    qtyButtons[0].addEventListener('click', function() {
        let current = parseInt(qtyNumber.textContent);
        qtyNumber.textContent = current + 1;
    });

    // Down button (second button)
    qtyButtons[1].addEventListener('click', function() {
        let current = parseInt(qtyNumber.textContent);
        if (current > 1) {
            qtyNumber.textContent = current - 1;
        }
    });
}

// ===== QUANTITY TOGGLE (Cart page) =====
const qtyNumber1 = document.getElementById('qty-number-1');
const qtyNumber2 = document.getElementById('qty-number-2');
const price1 = 1049.99;
const price2 = 989.99;
const subtotalEl = document.getElementById('subtotal-amount');

function updateSubtotal() {
    if (!subtotalEl) return;
    const qty1 = qtyNumber1 ? parseInt(qtyNumber1.textContent) : 0;
    const qty2 = qtyNumber2 ? parseInt(qtyNumber2.textContent) : 0;
    const total = (qty1 * price1) + (qty2 * price2);
    subtotalEl.textContent = 'AUD ' + total.toFixed(2);
}

// Cart qty-toggle-1
const cartQtyToggles = document.querySelectorAll('.qty-toggle');

cartQtyToggles.forEach(function(toggle, index) {
    const buttons = toggle.querySelectorAll('button');
    const qtyEl = index === 0 ? qtyNumber1 : qtyNumber2;

    if (buttons.length === 2 && qtyEl) {
        buttons[0].addEventListener('click', function() {
            let current = parseInt(qtyEl.textContent);
            qtyEl.textContent = current + 1;
            updateSubtotal();
        });

        buttons[1].addEventListener('click', function() {
            let current = parseInt(qtyEl.textContent);
            if (current > 1) {
                qtyEl.textContent = current - 1;
                updateSubtotal();
            }
        });
    }
});