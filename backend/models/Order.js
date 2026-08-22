const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        image: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);


const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        customer: {
            name: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            pincode: {
                type: String,
                required: true
            }
        },

        products: {
            type: [orderItemSchema],
            required: true
        },

        subtotal: {
            type: Number,
            required: true,
            default: 0
        },

        discount: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            required: true,
            default: 0
        },

        status: {
            type: String,
            enum: [
                "New",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "New"
        },

        paymentMethod: {
            type: String,
            default: "Cash on Delivery"
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Failed"
            ],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);


module.exports =
    mongoose.model("Order", orderSchema);