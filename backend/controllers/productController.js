const Product = require("../models/Product");


const getProducts = async (req, res) => {

    try {

        const { search, category } = req.query;

        const filter = {};

        if (search) {

            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    brand: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];

        }

        if (category && category !== "All") {
            filter.category = category;
        }

        const products = await Product
            .find(filter)
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        console.error(
            "Get Products Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load products"
        });

    }

};


// =====================================================
// GET SINGLE PRODUCT
// =====================================================

const getProduct = async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.json({
            success: true,
            product
        });

    } catch (error) {

        console.error(
            "Get Product Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load product"
        });

    }

};


// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (req, res) => {

    try {

        const product =
            await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {

        console.error(
            "Create Product Error:",
            error
        );

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    getProducts,
    getProduct,
    createProduct
};