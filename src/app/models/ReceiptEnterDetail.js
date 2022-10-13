const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptEnterDetailSchema = new Schema({
    receiptEnterDetail_id: {
        type: Number,
        require: true,
    },
    calculation_unit: {
        type: String,
        default: "cai",
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    cost_enter: {
        type: String,
        require: true,
    },
    receiptEnterWarehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReceiptEnterWarehouse",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

let ReceiptEnterDetail = mongoose.model(
    "ReceiptEnterDetail",
    receiptEnterDetailSchema
);
module.exports = { ReceiptEnterDetail };
