document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});


function getCart() {

    return JSON.parse(
        localStorage.getItem("glowaraCart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "glowaraCart",
        JSON.stringify(cart)
    );

}


function displayCart() {

    const container =
        document.getElementById("cartItems");

    const cart = getCart();

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <h2>Your bag is empty 🛍️</h2>

                <p>
                    Looks like you haven't added
                    anything yet.
                </p>

                <a
                    href="index.html"
                    class="shop-btn"
                >
                    CONTINUE SHOPPING
                </a>

            </div>
        `;

        updateSummary();

        return;
    }

    container.innerHTML = "";

    cart.forEach(item => {

        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>

                <div class="cart-item-details">

                    <div class="cart-brand">
                        ${item.brand}
                    </div>

                    <div class="cart-name">
                        ${item.name}
                    </div>

                    <div class="cart-price">
                        ₹${item.price}
                    </div>

                    <div class="quantity-box">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeItem(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });

    updateSummary();

}


function changeQuantity(id, change) {

    const cart = getCart();

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        const newCart =
            cart.filter(product => product.id !== id);

        saveCart(newCart);

    } else {

        saveCart(cart);

    }

    displayCart();

}


function removeItem(id) {

    const cart = getCart();

    const newCart =
        cart.filter(item => item.id !== id);

    saveCart(newCart);

    displayCart();

}


function updateSummary() {

    const cart = getCart();

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });

    const discount = Math.round(
        subtotal * 0.10
    );

    const total =
        subtotal - discount;

    const subtotalElement =
        document.getElementById("subtotal");

    const discountElement =
        document.getElementById("discount");

    const totalElement =
        document.getElementById("total");

    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${subtotal}`;

    }

    if (discountElement) {

        discountElement.textContent =
            `-₹${discount}`;

    }

    if (totalElement) {

        totalElement.textContent =
            `₹${total}`;

    }

}


function goToCheckout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your shopping bag is empty.");

        return;

    }

    window.location.href =
        "checkout.html";

}