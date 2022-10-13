const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
    {
        warehouse_id: {
            type: Number,
            require: true,
        },
        location: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        receiptEnterWarehouses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ReceiptEnterWarehouse",
            },
        ],
        nameStoreKeeper: {
            type: String,
            require: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

let Warehouse = mongoose.model("Warehouse", warehouseSchema);
module.exports = { Warehouse };
