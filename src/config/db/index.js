const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/clothes_shop_server";
async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect Clothes Shop Server Successfully!!");
    } catch (error) {
        console.log("Connect Clothes Shop Server Failure!!!");
    }
}

module.exports = { connect };
