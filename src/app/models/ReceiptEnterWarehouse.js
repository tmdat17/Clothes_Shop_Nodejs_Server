const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptEnterWarehouseSchema = new Schema(
    {
        receipt_enter_id: {
            type: Number,
            require: true,
        },
        name_shipper: {
            type: String,
            require: true,
        },
        date_ship: {
            type: String,
            require: true,
        },
        location_enter_warehouse: {
            type: String,
            require: true,
        },
        address_warehouse: {
            type: String,
            require: true,
        },
        date_sign: {
            type: String,
            require: true,
        },
        signature_chief_accountant: {
            type: String,
            default: "Chu ki ke toan truong",
            require: true,
        },
        signature_creator: {
            type: String,
            default: "Chu ki nguoi lap hoa don",
            require: true,
        },
        signature_shipper: {
            type: String,
            default: "Chu ki nguoi giao hang",
            require: true,
        },
        signature_storekeeper: {
            type: String,
            default: "Chu ki nguoi thu kho",
            require: true,
        },
        total_cost_by_text: {
            type: String,
            default: "so tien bang chu",
            require: true,
        },
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
        },
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
        },
        receiptEnterDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ReceiptEnterDetail",
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

let ReceiptEnterWarehouse = mongoose.model(
    "ReceiptEnterWarehouse",
    receiptEnterWarehouseSchema
);

module.exports = { ReceiptEnterWarehouse };
