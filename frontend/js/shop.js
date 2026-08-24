document.addEventListener("DOMContentLoaded", () => {

    const grid =
        document.getElementById("shopProductGrid");

    const count =
        document.getElementById("productCount");

    const searchInput =
        document.getElementById("shopSearch");

    const searchButton =
        document.getElementById("shopSearchBtn");

    const sortSelect =
        document.getElementById("sortProducts");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    if (!grid) return;


    let currentCategory = "All";
    let currentSearch = "";
    let allProducts = [];


    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const urlCategory =
        urlParams.get("category");


    if (urlCategory) {
        currentCategory = urlCategory;
    }


    async function loadProducts() {

        try {

            grid.innerHTML = `
                <div class="no-products">
                    <h2>Loading products...</h2>
                </div>
            `;


            const params =
                new URLSearchParams();


            if (
                currentCategory &&
                currentCategory !== "All"
            ) {

                params.set(
                    "category",
                    currentCategory
                );

            }


            if (currentSearch) {

                params.set(
                    "search",
                    currentSearch
                );

            }


const API_URL = "https://glowara-015n.onrender.com";


const response =
    await fetch(
        `${API_URL}/api/products?${params.toString()}`
    );

            const data =
                await response.json();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Failed to load products"
                );

            }


            allProducts =
                data.products || [];


            renderProducts();


        } catch (error) {

            console.error(
                "Shop Products Error:",
                error
            );


            grid.innerHTML = `
                <div class="no-products">

                    <h2>
                        Unable to load products
                    </h2>

                    <p>
                        Please try again.
                    </p>

                </div>
            `;

        }

    }


    function renderProducts() {

        let filtered =
            [...allProducts];


        const sortValue =
            sortSelect?.value;


        if (sortValue === "low") {

            filtered.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        if (sortValue === "high") {

            filtered.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        if (sortValue === "rating") {

            filtered.sort(
                (a, b) =>
                    b.rating - a.rating
            );

        }


        if (count) {
            count.textContent =
                filtered.length;
        }


        if (filtered.length === 0) {

            grid.innerHTML = `
                <div class="no-products">

                    <h2>
                        No products found
                    </h2>

                    <p>
                        Try another search or category.
                    </p>

                </div>
            `;

            return;

        }


        grid.innerHTML =
            filtered.map(product => {

                const discount =
                    product.oldPrice > product.price
                        ? Math.round(
                            (
                                (
                                    product.oldPrice -
                                    product.price
                                ) /
                                product.oldPrice
                            ) * 100
                        )
                        : 0;


                return `

                    <article
                        class="shop-product-card"
                    >

                        <div
                            class="shop-product-image"
                        >

                            <a
                                href="product.html?id=${product._id}"
                                class="product-link"
                            >

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >

                            </a>


                            ${
                                product.featured
                                ? `
                                    <span
                                        class="product-label new"
                                    >
                                        NEW
                                    </span>
                                `
                                : ""
                            }


                            ${
                                discount > 0
                                ? `
                                    <span
                                        class="product-label sale"
                                        style="top:45px;"
                                    >
                                        ${discount}% OFF
                                    </span>
                                `
                                : ""
                            }

                        </div>


                        <div
                            class="shop-product-info"
                        >

                            <div class="shop-brand">
                                ${product.brand}
                            </div>


                            <a
                                href="product.html?id=${product._id}"
                                class="product-name-link"
                            >

                                <div class="shop-name">
                                    ${product.name}
                                </div>

                            </a>


                            <div>

                                <span class="shop-price">
                                    ₹${product.price}
                                </span>

                                <span
                                    class="shop-old-price"
                                >
                                    ₹${product.oldPrice}
                                </span>

                            </div>


                            <div class="shop-rating">

                                ★ ${product.rating}

                                <span>
                                    (${product.reviews})
                                </span>

                            </div>


                            <button
                                class="shop-add-btn"
                                onclick="addMongoProductToCart('${product._id}')"
                            >
                                ADD TO CART
                            </button>

                        </div>

                    </article>

                `;

            }).join("");

    }


    async function performSearch() {

        currentSearch =
            searchInput?.value.trim() || "";


        await loadProducts();

    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                filterButtons.forEach(
                    btn =>
                        btn.classList.remove("active")
                );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                const url =
                    new URL(
                        window.location.href
                    );


                if (
                    currentCategory === "All"
                ) {

                    url.searchParams.delete(
                        "category"
                    );

                } else {

                    url.searchParams.set(
                        "category",
                        currentCategory
                    );

                }


                window.history.replaceState(
                    {},
                    "",
                    url
                );


                await loadProducts();

            }
        );

    });


    searchButton?.addEventListener(
        "click",
        performSearch
    );


    searchInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                performSearch();
            }

        }
    );


    sortSelect?.addEventListener(
        "change",
        renderProducts
    );


    async function addMongoProductToCart(
        productId
    ) {

        try {

           const API_URL = "https://glowara-015n.onrender.com";

const response =
    await fetch(
        `${API_URL}/api/products/${productId}`
    );

            const data =
                await response.json();


            if (!data.success) {

                throw new Error(
                    "Product not found"
                );

            }


            const product =
                data.product;


            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "glowaraCart"
                    )
                ) || [];


            const existing =
                cart.find(
                    item =>
                        item.id ===
                        product._id
                );


            if (existing) {

                existing.quantity += 1;

            } else {

                cart.push({

                    id: product._id,

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


            if (
                typeof updateCartCount ===
                "function"
            ) {

                updateCartCount();

            }


            if (
                typeof showToast ===
                "function"
            ) {

                showToast(
                    "Product added to bag"
                );

            } else {

                alert(
                    "Product added to bag"
                );

            }


        } catch (error) {

            console.error(error);

            alert(
                "Unable to add product"
            );

        }

    }


    window.addMongoProductToCart =
        addMongoProductToCart;


    loadProducts();

});