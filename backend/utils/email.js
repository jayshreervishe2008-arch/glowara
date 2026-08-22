const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendOrderNotification(order) {

    if (
        !process.env.EMAIL_USER ||
        !process.env.EMAIL_PASS ||
        !process.env.ADMIN_EMAIL
    ) {
        console.log("Email settings are not configured.");
        return;
    }

    const total = order.products.reduce(
        (sum, item) =>
            sum + Number(item.price) * Number(item.quantity),
        0
    );

    const discount = Math.round(total * 0.10);
    const finalTotal = total - discount;

    const productList = order.products
        .map(
            item =>
                `${item.name} x ${item.quantity} = ₹${
                    Number(item.price) * Number(item.quantity)
                }`
        )
        .join("\n");

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,

        subject: `🛍️ New Glowara Order - ${order.orderId}`,

        text: `
NEW GLOWARA ORDER

Order ID: ${order.orderId}

Customer:
Name: ${order.customer.name}
Phone: ${order.customer.phone}
Email: ${order.customer.email}

Address:
${order.customer.address}
${order.customer.city} - ${order.customer.pincode}

Products:
${productList}

Total: ₹${finalTotal}

Status: ${order.status}

Order Time:
${new Date(order.createdAt).toLocaleString("en-IN")}
        `
    });
}

module.exports = sendOrderNotification;