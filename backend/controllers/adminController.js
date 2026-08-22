const Product = require("../../models/Product");
const User = require("../../models/User");

const getDashboardStats = async (req, res) => {

    try {

        const productCount =
            await Product.countDocuments();

        const userCount =
            await User.countDocuments();

        res.json({
            success: true,
            stats: {
                totalProducts: productCount,
                totalUsers: userCount
            }
        });

    } catch (error) {

        console.error(
            "Admin Dashboard Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard"
        });

    }

};

module.exports = {
    getDashboardStats
};