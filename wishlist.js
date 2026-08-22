document.addEventListener("DOMContentLoaded", () => {

    renderWishlist();

});


function getWishlist() {

    return JSON.parse(
        localStorage.getItem("glowaraWishlist")
    ) || [];

}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "glowaraWishlist",
        JSON.stringify(wishlist)
    );

}


function renderWishlist() {

    const container =
        document.getElementById("wishlistGrid");

    if (!container) return;

    const wishlistIds =
        getWishlist();

    const wishlistProducts =
        products.filter(
            product => wishlistIds.includes(product.id)
        );


    if (wishlistProducts.length === 0) {

        container.innerHTML = `

            <div
                class="empty-wishlist"
                style="grid-column:1/-1;"
            >

                <i class="fa-regular fa-heart"></i>

                <h2>
                    Your wishlist is empty
                </h2>

                <p>
                    Save products you love
                    and find them here.
                </p>

                <a
                    href="shop.html"
                    class="wishlist-shop-btn"
                >
                    EXPLORE PRODUCTS
                </a>

            </div>

        `;

        return;
    }


    container.innerHTML = "";

    wishlistProducts.forEach(product => {

        container.innerHTML += `

            <article class="wishlist-card">

                <div class="wishlist-image">

                    <a
                        href="product.html?id=${product.id}"
                    >

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </a>

                </div>


                <div class="wishlist-info">

                    <div class="wishlist-brand">
                        ${product.brand}
                    </div>

                    <div class="wishlist-name">
                        ${product.name}
                    </div>

                    <div>

                        <span class="wishlist-price">
                            ₹${product.price}
                        </span>

                        <span class="wishlist-old-price">
                            ₹${product.oldPrice}
                        </span>

                    </div>


                    <div class="wishlist-actions">

                        <button
                            class="wishlist-cart-btn"
                            onclick="wishlistAddToCart(${product.id})"
                        >
                            ADD TO BAG
                        </button>

                        <button
                            class="wishlist-remove-btn"
                            onclick="removeFromWishlist(${product.id})"
                        >
                            REMOVE
                        </button>

                    </div>

                </div>

            </article>

        `;

    });

}


function wishlistAddToCart(id) {

    addToCart(id);

}


function removeFromWishlist(id) {

    let wishlist =
        getWishlist();

    wishlist =
        wishlist.filter(
            itemId => itemId !== id
        );

    saveWishlist(wishlist);

    renderWishlist();

    showWishlistToast(
        "Removed from wishlist"
    );

}


function showWishlistToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}