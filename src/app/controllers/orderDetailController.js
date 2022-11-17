const { OrderDetail } = require("../models/OrderDetail");
const { Order } = require("../models/Order");
const { Product } = require("../models/Product");

const orderDetailsController = {
    // [POST] /orderDetail/add  (Add new orderDetail)
    addOrderDetail: async (req, res) => {
        try {
            const newOrderDetail = new OrderDetail(req.body);
            const savedOrderDetail = await newOrderDetail.save();

            if (req.body.order) {
                const order = await Order.findById(req.body.order);
                await order.updateOne({
                    $push: {
                        orderDetails: savedOrderDetail._id,
                    },
                });
            }
            res.status(200).json(savedOrderDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /orderDetail/:id   (Get detail one OrderDetail)
    getOneOrderDetail: async (req, res) => {
        try {
            const orderDetailNeedFind = await OrderDetail.findById(
                req.params.id
            )
                .populate("order", "receiverName phone address methodPayment")
                .populate("product", "name_product price color");
            res.status(200).json(orderDetailNeedFind);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /orderDetail/   (Get all OrderDetail)
    getAllOrderDetail: async (req, res) => {
        try {
            const orderDetail = await OrderDetail.find()
                .populate("order", "receiverName phone address methodPayment")
                .populate("product", "name_product price color");
            res.status(200).json(orderDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = orderDetailsController;
