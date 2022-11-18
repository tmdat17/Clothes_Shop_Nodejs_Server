const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        receiverName: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
            maxlength: 10,
            minlength: 10,
        },
        birthday: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        city: {
            type: String,
            require: true,
        },
        district: {
            type: String,
            require: true,
        },
        ward: {
            type: String,
            require: true,
        },
        methodPayment: {
            type: String,
            require: true,
        },
        orderDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderDetail",
            },
        ],
        totalPrice: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            default: "Đang xử lí",
        },
    },
    {
        timestamps: true,
    }
);

let Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
