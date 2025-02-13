document.querySelectorAll(".product").forEach(product => {
    let count = 0;
    const countElement = product.querySelector("span");
    const decreaseBtn = product.querySelector(".quantity-btn:first-child");
    const increaseBtn = product.querySelector(".quantity-btn:last-child");
    const addToCartBtn = product.querySelector(".add-to-cart");

    decreaseBtn.addEventListener("click", () => {
        if (count > 0) {
            count--;
            countElement.textContent = count;
            updateCart(product);
        }
    });

    increaseBtn.addEventListener("click", () => {
        count++;
        countElement.textContent = count;
        updateCart(product);
    });

    addToCartBtn.addEventListener("click", () => {
        count++;
        countElement.textContent = count;
        updateCart(product);
    });
});

// Cart management
const cart = {};
const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

function updateCart(product) {
    const productName = product.querySelector("h3").textContent;
    const price = parseFloat(product.querySelector(".price").textContent.replace("$", ""));
    const quantity = parseInt(product.querySelector("span").textContent);

    if (quantity > 0) {
        cart[productName] = { price, quantity };
    } else {
        delete cart[productName];
    }

    renderCart();
}

function renderCart() {
    cartItemsElement.innerHTML = "";
    let total = 0;

    for (const [productName, item] of Object.entries(cart)) {
        const li = document.createElement("li");
        li.textContent = `${productName} - ${item.quantity} x $${item.price} = $${item.quantity * item.price}`;
        cartItemsElement.appendChild(li);
        total += item.quantity * item.price;
    }

    totalPriceElement.textContent = `Total: $${total}`;
}

// Checkout
function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty. Please add some products.");
    } else {
        alert("Thank you for your purchase!");
        Object.keys(cart).forEach(key => delete cart[key]);
        document.querySelectorAll(".product span").forEach(span => span.textContent = "0");
        renderCart();
    }
}
