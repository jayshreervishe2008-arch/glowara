document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCartCount();
    setupSearch();
});


function displayProducts() {

    const container = document.getElementById("productGrid");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
            <article class="product-card">

                <div class="product-image">

<img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-info">

                    <div class="product-brand">
                        ${product.brand}
                    </div>

                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div>
                        <span class="product-price">
                            ₹${product.price}
                        </span>

                        <span class="product-old-price">
                            ₹${product.oldPrice}
                        </span>
                    </div>

                    <div class="product-rating">
                        ★ ${product.rating}
                        <span style="color:#999">
                            (${product.reviews})
                        </span>
                    </div>

                    <button
                        class="add-to-cart btn"
                        onclick="addToCart(${product.id})"
                    >
                        ADD TO CART
                    </button>

                </div>

            </article>
        `;

    });
}


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


function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    let cart = JSON.parse(
        localStorage.getItem("glowaraCart")
    ) || [];

    const existing = cart.find(
        item => item.id === product.id
    );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            quantity: 1
        });

    }

    localStorage.setItem(
        "glowaraCart",
        JSON.stringify(cart)
    );

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    if (typeof showToast === "function") {
        showToast("Product added to cart");
    } else {
        alert("Product added to cart");
    }
}


function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


function setupSearch() {

    const input =
        document.getElementById("searchInput");

    const button =
        document.getElementById("searchBtn");

    if (!input) return;


    function search() {

        const value =
            input.value.trim().toLowerCase();

        if (!value) {

            showToast("Please enter a product name");

            return;
        }

        const results =
            products.filter(product =>
                product.name.toLowerCase().includes(value) ||
                product.brand.toLowerCase().includes(value) ||
                product.category.toLowerCase().includes(value)
            );

        const container =
            document.getElementById("productGrid");

        if (!results.length) {

            container.innerHTML = `
                <div style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:60px;
                    color:#777;
                ">
                    No products found
                </div>
            `;

            return;
        }

        container.innerHTML = "";

        results.forEach(product => {

            container.innerHTML += `
                <article class="product-card">

                    <div class="product-image">

                        <div class="product-placeholder">
                            <span>✨</span>
                            <small>${product.category}</small>
                        </div>

                    </div>

                    <div class="product-info">

                        <div class="product-brand">
                            ${product.brand}
                        </div>

                        <div class="product-name">
                            ${product.name}
                        </div>

                        <div>
                            <span class="product-price">
                                ₹${product.price}
                            </span>

                            <span class="product-old-price">
                                ₹${product.oldPrice}
                            </span>
                        </div>

                        <div class="product-rating">
                            ★ ${product.rating}
                        </div>

                        <button
                            class="add-cart"
                            onclick="addToCart(${product.id})"
                        >
                            ADD TO CART                   
                                 </button>

                    </div>

                </article>
            `;

        });

    }


    if (button) {
        button.addEventListener("click", search);
    }

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            search();
        }

    });

}
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.showToast = showToast;