const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        product_id: {
            type: Number,
            require: true,
        },
        name_product: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            maxLength: 600,
        },
        price_discount: {
            type: String,
        },
        color: {
            type: String,
        },
        thumbnail: {
            type: String,
            default: "url_img_thumbnail_product",
        },
        category: {
            // kieu du lieu lam khoa ngoai cho Product la ObjectId
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            //tham chieu den collecttion Category trong mongoose
        },
        warehouses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Warehouse",
            },
        ],
        galerys: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Galery",
            },
        ],
        receiptEnterDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ReceiptEnterDetail",
            },
        ],
        receiptEnterWarehouses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ReceiptEnterWarehouse",
            },
        ],

        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

let Product = mongoose.model("Product", productSchema);

module.exports = { Product };
