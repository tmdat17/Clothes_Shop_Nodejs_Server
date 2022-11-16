const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {},
    {
        timestamps: true,
    }
);

let Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
