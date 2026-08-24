const mongoose = require("mongoose");
const Product = require("./models/Product");

require("dotenv").config({ path: __dirname + "/.env" });

const products = [
    {
        brand: "Glowara",
        name: "Radiant Glow Face Serum",
        category: "Skincare",
        price: 699,
        oldPrice: 999,
        rating: 4.8,
        reviews: 124,
        image: "images/products/serium.jpg",
        stock: 50,
        featured: true
    },
    {
        brand: "Glowara",
        name: "Hydrating Beauty Cream",
        category: "Skincare",
        price: 549,
        oldPrice: 799,
        rating: 4.7,
        reviews: 89,
        image: "images/products/cream.jpg",
        stock: 50,
        featured: true
    },
    {
        brand: "Glowara",
        name: "Velvet Matte Lipstick",
        category: "Makeup",
        price: 399,
        oldPrice: 599,
        rating: 4.9,
        reviews: 210,
        image: "images/products/lipstick.jpg",
        stock: 50,
        featured: true
    },
    {
        brand: "Glowara",
        name: "Luxury Eau De Parfum",
        category: "Fragrance",
        price: 899,
        oldPrice: 1299,
        rating: 4.6,
        reviews: 76,
        image: "images/products/perfum.jpg",
        stock: 50,
        featured: true
    },
    {
        brand: "Glowara",
        name: "Vitamin C Brightening Serum",
        category: "Skincare",
        price: 749,
        oldPrice: 1099,
        rating: 4.8,
        reviews: 156,
        image: "images/products/vitamin-c.jpg",
        stock: 50,
        featured: false
    },
    {
        brand: "Glowara",
        name: "Nourishing Hair Mask",
        category: "Haircare",
        price: 499,
        oldPrice: 699,
        rating: 4.7,
        reviews: 63,
        image: "images/products/hair-mask.jpg",
        stock: 50,
        featured: false
    },
    {
        brand: "Glowara",
        name: "Premium Kajal",
        category: "Makeup",
        price: 299,
        oldPrice: 449,
        rating: 4.9,
        reviews: 302,
        image: "images/products/kajal.jpg",
        stock: 50,
        featured: false
    },
    {
        brand: "Glowara",
        name: "Rose Body Mist",
        category: "Fragrance",
        price: 449,
        oldPrice: 649,
        rating: 4.6,
        reviews: 98,
        image: "images/products/body-mist.jpg",
        stock: 50,
        featured: false
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany({});

        await Product.insertMany(products);

        console.log(`${products.length} products inserted successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Seed Error:", error);
        process.exit(1);
    }
}

seedProducts();