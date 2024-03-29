// Lưu tất cả các route trong index này

const productRouter = require("./products");
const categoryRouter = require("./categories");
const galeryRouter = require("./galerys");
const warehouseRouter = require("./warehouses");
const receiptEnterDetailRouter = require("./receiptEnterDetails");
const receiptEnterWarehouseRouter = require("./receiptEnterWarehouses");
const authRouter = require("./auth");
const userRouter = require("./user");
const orderRouter = require("./orders");
const orderDetailRouter = require("./orderDetails");

function route(app) {
    app.use("/product", productRouter);
    app.use("/category", categoryRouter);
    app.use("/galery", galeryRouter);
    app.use("/receiptEnterDetail", receiptEnterDetailRouter);
    app.use("/receiptEnterWarehouse", receiptEnterWarehouseRouter);
    app.use("/warehouse", warehouseRouter);
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/order", orderRouter);
    app.use("/orderDetail", orderDetailRouter);
}

module.exports = route;
