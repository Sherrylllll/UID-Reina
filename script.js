// ===== MENU OVERLAY =====
const menuButton = document.querySelector('.mobile-menu-button');
const menuOverlay = document.querySelector('.menu-overlay');
const closeMenuButton = document.querySelector('.menu-overlay-top button');

if (menuButton) {
    menuButton.addEventListener('click', function () {
        menuOverlay.style.display = 'block';
    });
}

if (closeMenuButton) {
    closeMenuButton.addEventListener('click', function () {
        menuOverlay.style.display = 'none';
    });
}

// =============

// ===== DROPDOWN TOGGLES (Product pages) =====
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function (dropdown) {
    const button = dropdown.querySelector('button');
    const content = dropdown.querySelector('.hidden-content');

    if (button && content) {
        button.addEventListener('click', function () {
            // Close all other dropdowns first
            dropdowns.forEach(function (other) {
                if (other !== dropdown) {
                    other.querySelector('.hidden-content').classList.remove('active');
                }
            });
            // Toggle this one
            content.classList.toggle('active');
        });
    }
});

// ===== CART MANAGEMENT =====
function getCart() {
    const cart = localStorage.getItem('reinaCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('reinaCart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    // Check if product already exists
    const existing = cart.find(function (item) {
        return item.name === product.name;
    });

    if (existing) {
        existing.qty += product.qty;
    } else {
        cart.push(product);
    }
    saveCart(cart);
}

// ===== ADD TO BAG + CART NOTIFICATION =====
const addToBagButton = document.querySelector('.cart-actions > button');
const cartNotification = document.getElementById('cart-notification');

if (addToBagButton && cartNotification) {
    addToBagButton.addEventListener('click', function () {
        // Get product details from the page
        const productName = document.querySelector('.written-details h1').textContent.trim();
        const productPrice = document.querySelector('.written-details h2').textContent.trim();
        const productImg = document.querySelector('.pdt-gallery > img').src;
        const qty = parseInt(document.getElementById('qty-number').textContent) || 1;

        const product = {
            name: productName,
            price: productPrice,
            image: productImg,
            qty: qty,
            size: 'IT 40'
        };

        addToCart(product);

        const notiTitle = cartNotification.querySelector('.cart-noti-pdtitle');
        const notiQty = cartNotification.querySelector('.cart-notification-details p:nth-child(3)');

        if (notiTitle) notiTitle.textContent = productName;
        if (notiQty) notiQty.textContent = 'QTY: ' + qty;

        // Show notification
        cartNotification.classList.add('active');

        // Auto hide after 3 seconds
        setTimeout(function () {
            cartNotification.classList.remove('active');
        }, 3000);
    });
}

// ===== QUANTITY TOGGLE (Product pages) =====
const qtyNumber = document.getElementById('qty-number');
const qtyButtons = document.querySelectorAll('.qty-toggle button');

if (qtyNumber && qtyButtons.length === 2) {
    //Up button
    qtyButtons[0].addEventListener('click', function () {
        let current = parseInt(qtyNumber.textContent);
        qtyNumber.textContent = current + 1;
    });

    //Down button
    qtyButtons[1].addEventListener('click', function () {
        let current = parseInt(qtyNumber.textContent);
        if (current > 1) {
            qtyNumber.textContent = current - 1;
        }
    });
}

// ===== CART PAGE - Render dynamic cart =====
const cartTableBody = document.querySelector('.product-table tbody');
const subtotalEl = document.getElementById('subtotal-amount');

function renderCart() {
    if (!cartTableBody) return;

    const cart = getCart();

    if (cart.length === 0) {
        // Show empty cart message
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 60px 20px; font-size: 1.2rem; color: rgba(0,0,0,0.5);">
                    No items in the cart
                </td>
            </tr>
        `;
        if (subtotalEl) subtotalEl.textContent = 'AUD 0.00';
        return;
    }

    let total = 0;
    cartTableBody.innerHTML = '';

    cart.forEach(function (item, index) {
        // Extract numeric price
        const priceNum = parseFloat(item.price.replace('AUD', '').trim());
        const itemTotal = priceNum * item.qty;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="carttable-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cartt-pdttext">
                        <p>${item.name}</p>
                        <p>Size: ${item.size}</p>
                    </div>
                </div>
            </td>
            <td>${item.price}</td>
            <td>
                <div class="carttable-quantity">
                    <div class="qty-toggle">
                        <button onclick="updateQty(${index}, 1)">&#8743;</button>
                        <span>QTY:</span>
                        <span>${item.qty}</span>
                        <button onclick="updateQty(${index}, -1)">&#8744;</button>
                    </div>
                    <i class="fa-solid fa-trash" onclick="removeItem(${index})" style="cursor:pointer; color:rgba(0,0,0,0.5);"></i>
                </div>
            </td>
            <td>AUD ${itemTotal.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
    });

    if (subtotalEl) subtotalEl.textContent = 'AUD ' + total.toFixed(2);
}

function updateQty(index, change) {
    const cart = getCart();
    cart[index].qty += change;
    if (cart[index].qty < 1) cart[index].qty = 1;
    saveCart(cart);
    renderCart();
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// Render cart on page load
renderCart();



// ===== CHECKOUT 1 - Form validation =====
const nextButton = document.querySelector('.checkout1-next');

if (nextButton) {
    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        let allValid = true;

        // Required text fields
        const textInputs = document.querySelectorAll('input[type="text"]');
        textInputs.forEach(function (input) {
            if (input.value.trim() === '') {
                allValid = false;
                input.style.borderColor = 'red';
            } else if (input.value.trim().length < 2) {
                allValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });

        // Email validation
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                allValid = false;
                emailInput.style.borderColor = 'red';
                emailInput.placeholder = 'Please enter a valid email (e.g. name@domain.com)';
            } else {
                emailInput.style.borderColor = '';
            }
        }

        // Phone validation - must be numbers only, min 8 digits
        const phoneInput = document.querySelector('input[type="tel"]');
        if (phoneInput) {
            const phoneRegex = /^[0-9]{8,15}$/;
            if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
                allValid = false;
                phoneInput.style.borderColor = 'red';
                phoneInput.placeholder = 'Please enter a valid phone number';
            } else {
                phoneInput.style.borderColor = '';
            }
        }

        if (allValid) {
            window.location.href = 'checkout2.html';
        } else {
            alert('Please fill in all fields correctly before continuing.');
        }
    });
}