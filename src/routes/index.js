// Lưu tất cả các route trong index này

const productRouter = require("./products");
const categoryRouter = require("./categories");
const galeryRouter = require("./galerys");
const warehouseRouter = require("./warehouses");
const receiptEnterDetailRouter = require("./receiptEnterDetails");
const receiptEnterWarehouseRouter = require("./receiptEnterWarehouses");

function route(app) {
    app.use("/product", productRouter);
    app.use("/category", categoryRouter);
    app.use("/galery", galeryRouter);
    app.use("/receiptEnterDetail", receiptEnterDetailRouter);
    app.use("/receiptEnterWarehouse", receiptEnterWarehouseRouter);
    app.use("/warehouse", warehouseRouter);
}

module.exports = route;
