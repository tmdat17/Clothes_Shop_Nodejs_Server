const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galerySchema = new Schema(
    {
        galery_id: {
            type: Number,
            require: true,
        },
        image_url: {
            type: String,
            default: "url image is temp",
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
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

let Galery = mongoose.model("Galery", galerySchema);
module.exports = { Galery };
