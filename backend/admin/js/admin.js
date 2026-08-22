document.addEventListener("DOMContentLoaded", () => {
    loadOrders();
});


async function loadOrders() {

    const table =
        document.getElementById("ordersTable");

    if (!table) return;

    table.innerHTML = `
        <tr>
            <td colspan="6" class="loading-state">
                Loading orders...
            </td>
        </tr>
    `;

    try {

        const response =
            await fetch("/api/admin/orders");

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data =
            await response.json();

        if (!data.success) {
            throw new Error(
                data.message || "Unable to load orders"
            );
        }

        const orders = data.orders || [];

        updateStats(orders);

        if (orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        No orders found
                    </td>
                </tr>
            `;

            return;
        }

        table.innerHTML = "";

        [...orders]
            .reverse()
            .forEach(order => {

                const total =
                    calculateTotal(order.products);

                const products =
                    order.products
                        .map(item =>
                            `${item.name} × ${item.quantity}`
                        )
                        .join("<br>");

                const date =
                    new Date(order.createdAt)
                        .toLocaleString("en-IN");

                table.innerHTML += `

                    <tr>

                        <td>
                            <div class="order-id">
                                ${order.orderId}
                            </div>
                        </td>

                        <td>

                            <div class="customer-name">
                                ${order.customer.name}
                            </div>

                            <div class="customer-phone">
                                ${order.customer.phone}
                            </div>

                        </td>

                        <td>

                            <div class="product-list">
                                ${products}
                            </div>

                        </td>

                        <td>
                            <strong>
                                ₹${total}
                            </strong>
                        </td>

                        <td>

                            <span class="status-badge">
                                ${order.status}
                            </span>

                        </td>

                        <td>
                            ${date}
                        </td>

                    </tr>

                `;

            });

    } catch (error) {

        console.error(
            "Admin Orders Error:",
            error
        );

        table.innerHTML = `
            <tr>
                <td colspan="6" class="error-state">
                    Failed to load orders
                </td>
            </tr>
        `;

    }

}


function calculateTotal(products) {

    let total = 0;

    products.forEach(item => {

        total +=
            Number(item.price) *
            Number(item.quantity);

    });

    const discount =
        Math.round(total * 0.10);

    return total - discount;

}


function updateStats(orders) {

    const totalOrders =
        document.getElementById("totalOrders");

    const newOrders =
        document.getElementById("newOrders");

    const totalRevenue =
        document.getElementById("totalRevenue");

    const newCount =
        orders.filter(
            order => order.status === "New"
        ).length;

    let revenue = 0;

    orders.forEach(order => {

        revenue +=
            calculateTotal(order.products);

    });

    if (totalOrders) {
        totalOrders.textContent =
            orders.length;
    }

    if (newOrders) {
        newOrders.textContent =
            newCount;
    }

    if (totalRevenue) {
        totalRevenue.textContent =
            `₹${revenue}`;
    }

}