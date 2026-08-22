const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        oldPrice: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            default: 4.5
        },

        reviews: {
            type: Number,
            default: 0
        },

        image: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            default: 0
        },

        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);