const { Order } = require("../models/Order");
const { User } = require("../models/User");

const orderController = {
    // [POST] /order/add  (add new order)
    addOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const savedOrder = await newOrder.save();
            if (req.body.user) {
                const user = await User.findById(req.body.user);
                await user.updateOne({
                    $push: {
                        orders: savedOrder._id,
                    },
                });
            }
            res.status(200).json(savedOrder._id);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /order/:id  (get detail one order)
    getOneOrder: async (req, res) => {
        try {
            const orderNeedFind = await Order.findById(req.params.id)
                .populate("orderDetails")
                .populate("user", "fullname phone birthday orders admin");
            res.status(200).json(orderNeedFind);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /order/   (Get all OrderDetail)
    getAllOrderDetail: async (req, res) => {
        try {
            const order = await Order.find()
                .populate("orderDetails", "nameProduct size quatity price")
                .populate("user", "fullname phone birthday orders admin");
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = orderController;
