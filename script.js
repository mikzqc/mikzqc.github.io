// Cart object to store selected items
const cart = {};

// Function to update quantity of a product
function updateQuantity(productName, price, action) {
    const quantityElement = document.getElementById(`quantity-${productName}`);
    let quantity = parseInt(quantityElement.textContent);

    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 0) {
        quantity--;
    }

    quantityElement.textContent = quantity;

    // Update cart
    if (quantity > 0) {
        cart[productName] = { price, quantity };
    } else {
        delete cart[productName];
    }

    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItemsElement.innerHTML = ""; // Clear existing cart items
    let total = 0;

    for (const [productName, item] of Object.entries(cart)) {
        const li = document.createElement("li");
        li.textContent = `${productName} - ${item.quantity} x $${item.price} = $${item.quantity * item.price}`;
        cartItemsElement.appendChild(li);
        total += item.quantity * item.price;
    }

    totalPriceElement.textContent = `Total: $${total}`;
}

// Function to handle checkout
function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty. Please add some products.");
    } else {
        alert("Thank you for your purchase!");
        clearCart();
    }
}

// Function to clear the cart after checkout
function clearCart() {
    for (const product in cart) {
        const quantityElement = document.getElementById(`quantity-${product}`);
        if (quantityElement) {
            quantityElement.textContent = "0";
        }
    }
    Object.keys(cart).forEach((key) => delete cart[key]);
    updateCart();
}

// Function to go back to home page
function goHome() {
    window.location.href = "index.html"; // Ensure index.html exists in your project
}
