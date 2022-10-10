const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        category_id: {
            type: Number,
            require: true,
        },
        name_category: {
            type: String,
            require: true,
        },
        type_product: {
            type: String,
            require: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
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

let Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
