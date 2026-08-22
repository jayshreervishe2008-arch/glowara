const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
const frontendPath = path.join(__dirname, "../frontend");
const adminPath = path.join(__dirname, "admin");
const imagesPath = path.join(frontendPath, "images");
const ordersFile = path.join(__dirname, "orders.json");


app.use(express.static(frontendPath));



app.use("/admin", express.static(adminPath));
/* =========================
   CREATE ORDERS FILE
========================= */

if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, "[]");
}


/* =========================
   STATIC FILES
========================= */

app.use(express.static(frontendPath));

app.use("/admin", express.static(adminPath));


/* =========================
   HOME
========================= */

app.get("/", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "index.html")
    );
});


/* =========================
   ADMIN ORDERS PAGE
========================= */

app.get("/admin/orders.html", (req, res) => {
    res.sendFile(
        path.join(adminPath, "orders.html")
    );
});


/* =========================
   HEALTH
========================= */

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "Glowara API is running"
    });

});


/* =========================
   AUTH ROUTES
========================= */

app.use("/api/auth", require("./routes/authRoutes"));

app.use(
    "/api/products",
    require("./routes/productRoutes")
);

/* =========================
   CREATE ORDER
========================= */

app.post("/api/orders", (req, res) => {

    try {

        const order = req.body;

        if (
            !order.customer ||
            !order.customer.name ||
            !order.customer.phone ||
            !order.customer.address ||
            !order.products ||
            order.products.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message: "Incomplete order details"
            });

        }


        const orders = JSON.parse(
            fs.readFileSync(
                ordersFile,
                "utf8"
            )
        );


        const newOrder = {

            orderId:
                "GW" + Date.now(),

            ...order,

            status: "New",

            createdAt:
                new Date().toISOString()

        };


        orders.push(newOrder);


        fs.writeFileSync(
            ordersFile,
            JSON.stringify(
                orders,
                null,
                2
            )
        );


        console.log(
            "NEW GLOWARA ORDER:",
            newOrder.orderId
        );


        res.status(201).json({

            success: true,

            message:
                "Order placed successfully",

            orderId:
                newOrder.orderId

        });


    } catch (error) {

        console.error(
            "Order Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to save order"

        });

    }

});


/* =========================
   ADMIN ORDERS API
========================= */

app.get(
    "/api/admin/orders",
    (req, res) => {

        try {

            const orders =
                JSON.parse(
                    fs.readFileSync(
                        ordersFile,
                        "utf8"
                    )
                );


            res.json({

                success: true,

                orders

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to load orders"

            });

        }

    }
);


/* =========================
   SERVER
========================= */

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `Glowara Server running on http://localhost:${PORT}`
        );

    }
);