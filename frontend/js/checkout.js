document.addEventListener("DOMContentLoaded", () => {

    loadCheckout();

    const form = document.getElementById("checkoutForm");

    if (form) {
        form.addEventListener("submit", placeOrder);
    }

});


function getCart() {

    return JSON.parse(
        localStorage.getItem("glowaraCart")
    ) || [];

}


function loadCheckout() {

    const cart = getCart();

    const container =
        document.getElementById("checkoutProducts");

    const totalElement =
        document.getElementById("checkoutTotal");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <p>Your bag is empty.</p>

            <a href="index.html">
                Continue Shopping
            </a>
        `;

        if (totalElement) {
            totalElement.textContent = "₹0";
        }

        return;
    }

    let total = 0;

    container.innerHTML = "";

    cart.forEach(item => {

        total += item.price * item.quantity;

        container.innerHTML += `

            <div class="checkout-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="checkout-product-info">

                    <div class="checkout-product-name">
                        ${item.name}
                    </div>

                    <div>
                        Qty: ${item.quantity}
                    </div>

                    <div class="checkout-product-price">
                        ₹${item.price * item.quantity}
                    </div>

                </div>

            </div>

        `;

    });

    const discount = Math.round(total * 0.10);

    const finalTotal = total - discount;

    if (totalElement) {
        totalElement.textContent = `₹${finalTotal}`;
    }

}


async function placeOrder(event) {

    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your shopping bag is empty.");

        return;
    }


    const order = {

        customer: {

            name:
                document.getElementById("customerName").value,

            phone:
                document.getElementById("customerPhone").value,

            email:
                document.getElementById("customerEmail").value,

            address:
                document.getElementById("customerAddress").value,

            city:
                document.getElementById("customerCity").value,

            pincode:
                document.getElementById("customerPincode").value

        },

        products: cart,

        createdAt: new Date().toISOString()

    };


    try {

const response = await fetch(
    "http://localhost:5000/api/orders",            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(order)
            }
        );


      const responseText = await response.text();

let data;

try {
    data = JSON.parse(responseText);
} catch (error) {
    console.error("SERVER RESPONSE:", responseText);
    throw new Error("Server returned an invalid response");
}


        if (!response.ok) {

            throw new Error(
                data.message || "Order failed"
            );

        }


        localStorage.removeItem("glowaraCart");


        alert(
            "🎉 Order placed successfully!\n\nOrder ID: " +
            (data.orderId || "Generated")
        );


        window.location.href = "index.html";


    } catch (error) {

        console.error(
            "ORDER ERROR:",
            error
        );

        alert(
            "Order could not be placed: " +
            error.message
        );

    }

}