const fs = require("fs");
const path = require("path");

const ordersFile =
    path.join(__dirname, "../../orders.json");


const readOrders = () => {

    if (!fs.existsSync(ordersFile)) {
        return [];
    }

    try {

        return JSON.parse(
            fs.readFileSync(
                ordersFile,
                "utf8"
            )
        );

    } catch (error) {

        console.error(
            "Read Orders Error:",
            error
        );

        return [];

    }

};


const getOrders = async (req, res) => {

    try {

        const orders =
            readOrders();

        res.json({

            success: true,

            count: orders.length,

            orders

        });

    } catch (error) {

        console.error(
            "Admin Orders Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load orders"

        });

    }

};


const getOrderById = async (req, res) => {

    try {

        const orders =
            readOrders();

        const order =
            orders.find(
                item =>
                    item.orderId ===
                    req.params.id
            );

        if (!order) {

            return res.status(404).json({

                success: false,

                message:
                    "Order not found"

            });

        }

        res.json({

            success: true,

            order

        });

    } catch (error) {

        console.error(
            "Get Order Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load order"

        });

    }

};


const updateOrderStatus = async (req, res) => {

    try {

        const {
            status
        } = req.body;

        const allowedStatuses = [
            "New",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (
            !allowedStatuses.includes(status)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid order status"

            });

        }


        const orders =
            readOrders();


        const index =
            orders.findIndex(
                item =>
                    item.orderId ===
                    req.params.id
            );


        if (index === -1) {

            return res.status(404).json({

                success: false,

                message:
                    "Order not found"

            });

        }


        orders[index].status =
            status;


        fs.writeFileSync(

            ordersFile,

            JSON.stringify(
                orders,
                null,
                2
            )

        );


        res.json({

            success: true,

            message:
                "Order status updated",

            order:
                orders[index]

        });


    } catch (error) {

        console.error(
            "Update Order Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update order"

        });

    }

};


module.exports = {
    getOrders,
    getOrderById,
    updateOrderStatus
};