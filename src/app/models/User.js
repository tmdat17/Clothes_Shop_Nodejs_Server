const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
            maxlength: 10,
            minlength: 10,
            unique: true,
        },
        birthday: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
            minlength: 6,
        },
        accept_password: {
            type: String,
            require: true,
            minlength: 6,
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        cart: [
            {
                idProduct: {
                    type: String,
                },
                name: {
                    type: String,
                },
                img: {
                    type: String,
                },
                size: {
                    type: String,
                },
                quatity: {
                    type: String,
                },
                price: {
                    type: String,
                },
            },
        ],
        admin: {
            type: Boolean,
            default: false,
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

let User = mongoose.model("User", userSchema);
module.exports = { User };
