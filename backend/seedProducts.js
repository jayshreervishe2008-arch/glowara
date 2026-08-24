const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();






// =====================================================
// PRODUCT NAMES
// =====================================================

const catalog = {

    Makeup: [
        "Soft Glow Blush",
        "Brow Defining Pencil",
        "Everyday Beauty Palette",
        "HD Compact Powder",
        "Natural Finish Concealer",
        "Cream Contour Stick",
        "Rose Gold Eyeshadow Palette",
        "Silky Face Primer",
        "Hydra Glow Foundation",
        "Glow Highlighter",
        "Ultra Black Kajal",
        "Creamy Lip Crayon",
        "Nude Lip Gloss",
        "Matte Lip Tint",
        "Velvet Matte Lipstick",
        "Peach Liquid Blush",
        "Precision Liquid Eyeliner",
        "Professional Makeup Brush",
        "Volume Boost Mascara",
        "Makeup Setting Spray"
    ],


    Skincare: [
        "Aloe Vera Soothing Gel",
        "Clay Purifying Face Mask",
        "Gentle Face Cleanser",
        "Daily Moisturizing Cream",
        "Lightweight Face Lotion",
        "Brightening Face Mask",
        "Balancing Face Toner",
        "Gentle Face Wash",
        "Foaming Daily Cleanser",
        "Hyaluronic Hydration Serum",
        "Deep Hydration Gel",
        "Daily Moisturizer",
        "Niacinamide Pore Serum",
        "Night Repair Cream",
        "Rose Water Toner",
        "Radiant Glow Face Serum",
        "SPF 50 Sunscreen",
        "Under Eye Gel",
        "Vitamin C Brightening Serum"
    ],


    Haircare: [
        "Anti Frizz Hair Serum",
        "Argan Shine Hair Oil",
        "Daily Care Conditioner",
        "Curl Defining Cream",
        "Deep Moisture Hair Mask",
        "Gloss Finishing Hair Spray",
        "Hair Growth Care Oil",
        "Daily Hair Tonic",
        "Nourishing Hair Mask",
        "Repairing Hair Oil",
        "Heat Protection Hair Spray",
        "Keratin Repair Conditioner",
        "Keratin Smooth Shampoo",
        "Leave In Hair Cream",
        "Repair Hair Oil",
        "Scalp Care Shampoo",
        "Scalp Detox Scrub",
        "Smooth & Shine Shampoo",
        "Silky Smooth Conditioner",
        "Volume Boost Shampoo"
    ],


    Fragrance: [
        "Warm Amber Perfume",
        "Fresh Citrus Eau De Toilette",
        "Floral Dream Fragrance",
        "Jasmine Blossom Fragrance",
        "Musk & Rose Perfume",
        "Ocean Mist Eau De Toilette",
        "Midnight Oud Perfume",
        "Peach Blossom Eau De Parfum",
        "Luxury Eau De Parfum",
        "Rose Bloom Eau De Parfum",
        "Golden Sandalwood Perfume",
        "Velvet Vanilla Perfume"
    ],


    "Bath & Body": [
        "Aloe Body Lotion",
        "Self Care Bath Blend",
        "Refreshing Bath Salts",
        "Deep Moisture Body Cream",
        "Shea Butter Body Lotion",
        "Daily Body Mist",
        "Luxury Body Mist",
        "Rose Body Scrub",
        "Refreshing Body Wash",
        "Coffee Exfoliating Scrub",
        "Nourishing Foot Cream",
        "Silky Hand Cream",
        "Lavender Bath Soak",
        "Rose Exfoliating Body Scrub",
        "Shea Butter Body Lotion",
        "Hydrating Shower Gel",
        "Refreshing Shower Gel"
    ],


    Wellness: [
        "Detox Herbal Tea",
        "Fresh Energy Roll On",
        "Sleep Care Essential Oil",
        "Herbal Green Tea Blend",
        "Refreshing Mint Tea",
        "Relaxing Pillow Mist",
        "Calm & Focus Roll On"
    ]

};


// =====================================================
// ACTUAL LOCAL IMAGE FILES
// IMPORTANT: filenames exactly as in your folder
// =====================================================

const categoryImages = {

    Makeup: [

        "blush.jpg",
        "brow-pencil.jpg",
        "beauty-palette.jpg",
        "compact-powder.jpg",
        "concealer.jpg",
        "contour-stick.jpg",
        "eyeshadow.jpg",
        "face-primer.jpg",
        "foundation.jpg",
        "highlighter.jpg",
        "kajal.jpg",
        "lip-crayon.jpg",
        "lip-gloss.jpg",
        "lip-tint.jpg",
        "lipstick.jpg",
        "liquid-blush.jpg",
        "liquid-eyeliner.jpg",
        "makeup-brush.jpg",
        "mascara.jpg",
        "setting-spray.jpg"

    ],


    Skincare: [

        "aloe vera gel.jpg",
        "clay face mask.jpg",
        "cleanser.jpg",
        "cream.jpg",
        "face lotion.jpg",
        "face mask.jpg",
        "face-toner.jpg",
        "face-wash.jpg",
        "foaming-cleanser.jpg",
        "hyaluronic-seriume.jpg",
        "hydration gel.jpg",
        "moisturizer.jpg",
        "niacinamide-serum.jpg",
        "night repair cream.jpg",
        "rose-toner.jpg",
        "serium.jpg",
        "sunscreen.jpg",
        "under eye gel.jpg",
        "vitamin-c.jpg"

    ],


    Haircare: [

        "anti  hair serum.jpg",
        "argan hair oil.jpg",
        "conditioner.jpg",
        "curl defining cream.jpg",
        "deep moisture hair mask.jpg",
        "hair finishing spray.jpg",
        "hair growth oil.jpg",
        "hair tonic.jpg",
        "hair-mask.jpg",
        "hair-oil.jpg",
        "heat protection hair spray.jpg",
        "keratin conditioner.jpg",
        "keratin shampoo.jpg",
        "leave in hair cream.jpg",
        "repair hair oil.jpg",
        "scalp care shampoo.jpg",
        "scalp scrub.jpg",
        "shampoo.jpg",
        "smooth conditioner.jpg",
        "volume shampoo.jpg"

    ],


    Fragrance: [

        "amber-perfume.jpg",
        "citrus-perfume.jpg",
        "floral-perfume.jpg",
        "jasmine-perfume.jpg",
        "musk-perfume.jpg",
        "ocean-perfume.jpg",
        "oud-perfume.jpg",
        "peach-perfume.jpg",
        "perfum.jpg",
        "rose perfume.jpg",
        "sandalwood-perfume.jpg",
        "vanilla-perfume.jpg"

    ],


    "Bath & Body": [

        "aloe-body-lotion.jpg",
        "bath-blend.jpg",
        "bath-salts.jpg",
        "body-cream.jpg",
        "body-lotion.jpg",
        "body-mist.jpg",
        "body-mists.jpg",
        "body-scrub.jpg",
        "body-wash.jpg",
        "coffee-scrub.jpg",
        "foot-cream.jpg",
        "hand-cream.jpg",
        "lavender-bath.jpg",
        "rose-body-scrub.jpg",
        "shea-body-lotio.jpg",
        "shower-gel.jpg",
        "shower-gels.jpg"

    ],


    Wellness: [

        "detox tea.jpg",
        "energy-roll-on.jpg",
        "essential-oil.jpg",
        "green-tea.jpg",
        "mint-tea.jpg",
        "pillow-mist.jpg",
        "roll-on.jpg"

    ]

};


// =====================================================
// BASE PRICES
// =====================================================

const basePrices = {

    Makeup: 399,

    Skincare: 549,

    Haircare: 449,

    Fragrance: 699,

    "Bath & Body": 349,

    Wellness: 299

};


// =====================================================
// CREATE PRODUCTS
// NO IMAGE WILL REPEAT
// =====================================================

const products = [];

const usedImages = new Set();


for (const [category, names] of Object.entries(catalog)) {

    const images = categoryImages[category];

    if (!images || images.length === 0) {

        console.error(
            `No images found for ${category}`
        );

        continue;
    }


    const total =
        Math.min(
            names.length,
            images.length
        );


    for (let index = 0; index < total; index++) {

        const name =
            names[index];

        const imageFile =
            images[index];


        // ---------------------------------------------
        // DUPLICATE IMAGE PROTECTION
        // ---------------------------------------------

        if (usedImages.has(imageFile)) {

            console.error(
                `DUPLICATE IMAGE: ${imageFile}`
            );

            continue;
        }


        usedImages.add(imageFile);


        // ---------------------------------------------
        // PRICE
        // ---------------------------------------------

        const base =
            basePrices[category];


        const price =
            base +
            ((index % 5) * 100);


        const oldPrice =
            price +
            150 +
            ((index % 4) * 80);


        // ---------------------------------------------
        // RATING
        // ---------------------------------------------

        const rating =
            Number(
                (
                    4.3 +
                    ((index % 7) * 0.1)
                ).toFixed(1)
            );


        // ---------------------------------------------
        // REVIEWS
        // ---------------------------------------------

        const reviews =
            40 +
            (index * 17);


        // ---------------------------------------------
        // FEATURED
        // ---------------------------------------------

        const featured =
            index % 4 === 0;


        // ---------------------------------------------
        // LOCAL IMAGE URL
        // ---------------------------------------------

        const image =
            `/images/products/${encodeURIComponent(
                imageFile
            )}`;


        // ---------------------------------------------
        // CREATE PRODUCT
        // ---------------------------------------------

        products.push({

            name,

            brand: "Glowara",

            category,

            description:
                `${name} from Glowara is designed for an easy, everyday beauty and self-care routine.`,

            price,

            oldPrice,

            rating,

            reviews,

            image,

            stock:
                25 + (index * 5),

            featured

        });

    }

}


// =====================================================
// SEED DATABASE
// =====================================================

async function seedProducts() {

    try {

        if (!process.env.MONGO_URI) {

            throw new Error(
                "MONGO_URI is missing in .env file"
            );

        }


        console.log(
            "\n===================================="
        );

        console.log(
            "GLOWARA PRODUCT SEED"
        );

        console.log(
            "===================================="
        );


        console.log(
            `Products prepared: ${products.length}`
        );


        console.log(
            `Unique images used: ${usedImages.size}`
        );


        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "MongoDB connected"
        );


        // ---------------------------------------------
        // DELETE OLD PRODUCTS
        // ---------------------------------------------

        await Product.deleteMany({});


        console.log(
            "Old products deleted"
        );


        // ---------------------------------------------
        // INSERT PRODUCTS
        // ---------------------------------------------

        await Product.insertMany(
            products
        );


        console.log(
            `\n${products.length} products inserted successfully`
        );


        // ---------------------------------------------
        // CATEGORY COUNT
        // ---------------------------------------------

        const categoryCounts = {};


        products.forEach(product => {

            categoryCounts[product.category] =
                (categoryCounts[product.category] || 0) + 1;

        });


        console.log(
            "\nCategory Counts:"
        );


        console.log(
            categoryCounts
        );


        // ---------------------------------------------
        // IMAGE CHECK
        // ---------------------------------------------

        console.log(
            `\nTotal Unique Images: ${usedImages.size}`
        );


        console.log(
            "Image Repeat: NO"
        );


        console.log(
            "Image System: LOCAL"
        );


        await mongoose.disconnect();


        console.log(
            "\nDatabase disconnected"
        );


        console.log(
            "===================================="
        );


        process.exit(0);


    } catch (error) {

        console.error(
            "\nSeed Error:",
            error.message
        );


        await mongoose.disconnect()
            .catch(() => {});


        process.exit(1);

    }

}


seedProducts();