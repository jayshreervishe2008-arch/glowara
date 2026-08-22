document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

    const form =
        document.getElementById("productForm");

    if (form) {

        form.addEventListener(
            "submit",
            addProduct
        );

    }

});


async function loadProducts() {

    const grid =
        document.getElementById(
            "adminProductGrid"
        );

    if (!grid) return;


    grid.innerHTML = `
        <div class="loading-box">
            Loading products...
        </div>
    `;


    try {

        const response =
            await fetch("/api/products");

        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Failed to load products"
            );

        }


        const products =
            data.products || [];


        if (products.length === 0) {

            grid.innerHTML = `
                <div class="empty-box">
                    No products found.
                </div>
            `;

            return;
        }


        grid.innerHTML =
            products.map(product => {

                return `

                    <article
                        class="admin-product-card"
                    >

                        <div
                            class="admin-product-image"
                        >

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                onerror="
                                    this.style.display='none';
                                    this.parentElement.innerHTML='<div style=&quot;height:100%;display:flex;align-items:center;justify-content:center;font-size:45px&quot;>✨</div>';
                                "
                            >

                        </div>


                        <div
                            class="admin-product-info"
                        >

                            <div class="admin-brand">
                                ${product.brand}
                            </div>

                            <div
                                class="admin-product-name"
                            >
                                ${product.name}
                            </div>

                            <div
                                class="admin-product-price"
                            >
                                ₹${product.price}
                            </div>

                            <div class="admin-stock">
                                Stock:
                                ${product.stock}
                            </div>

                        </div>

                    </article>

                `;

            }).join("");


    } catch (error) {

        console.error(error);

        grid.innerHTML = `
            <div class="empty-box">
                Unable to load products.
            </div>
        `;

    }

}


async function addProduct(event) {

    event.preventDefault();


    const message =
        document.getElementById(
            "productMessage"
        );


    const product = {

        name:
            document.getElementById(
                "productName"
            ).value.trim(),

        brand:
            document.getElementById(
                "productBrand"
            ).value.trim(),

        category:
            document.getElementById(
                "productCategory"
            ).value,

        price:
            Number(
                document.getElementById(
                    "productPrice"
                ).value
            ),

        oldPrice:
            Number(
                document.getElementById(
                    "productOldPrice"
                ).value
            ),

        stock:
            Number(
                document.getElementById(
                    "productStock"
                ).value
            ),

        image:
            document.getElementById(
                "productImage"
            ).value.trim(),

        description:
            document.getElementById(
                "productDescription"
            ).value.trim(),

        rating: 4.5,

        reviews: 0,

        featured: false

    };


    try {

        const response =
            await fetch(
                "/api/products",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(product)

                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Product could not be added"
            );

        }


        message.textContent =
            "Product added successfully!";

        message.style.color =
            "#198754";


        document
            .getElementById("productForm")
            .reset();


        loadProducts();


    } catch (error) {

        console.error(error);

        message.textContent =
            error.message;

        message.style.color =
            "#d62828";

    }

}