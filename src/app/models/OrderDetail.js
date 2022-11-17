const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        require: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
    },
    nameProduct: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    quatity: {
        type: String,
        require: true,
    },
    size: {
        type: String,
        require: true,
    },
});

let OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
module.exports = { OrderDetail };
