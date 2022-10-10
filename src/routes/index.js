// Lưu tất cả các route trong index này

const productRouter = require("./products");
const categoryRouter = require("./categories");
const galeryRouter = require("./galerys");

function route(app) {
    app.use("/product", productRouter);
    app.use("/category", categoryRouter);
    app.use("/galery", galeryRouter);
}

module.exports = route;
