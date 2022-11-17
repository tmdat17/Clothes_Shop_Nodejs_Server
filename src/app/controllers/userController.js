const { User } = require("../models/User");

const userController = {
    // [GET] /user (get all users)
    getAllUser: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /user/:id (get detail one user)
    getOneUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate(
                "orders",
                "_id receiverName phone address city ward methodPayment totalPrice"
            );

            const { password, accept_password, ...others } = user._doc;
            res.status(200).json({ ...others });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /user/update/:id  (update infor user)
    updateUser: async (req, res) => {
        try {
            const userNeedUpdate = await User.findById(req.params.id);
            await userNeedUpdate.updateOne({ $set: req.body });
            res.status(200).json("Updated User Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /user/softdelete/:id   (Soft Delete User)
    softDeleteUser: async (req, res) => {
        try {
            const userNeedSoftDelete = User.findById(req.params.id);
            await userNeedSoftDelete.updateOne({ $set: { deleted: true } });
            res.status(200).json("Soft Delete User Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /user/delete/:id (Delete one user)
    deleteUser: async (req, res) => {
        try {
            // await Order.updateMany(
            //     { user: req.params.id },
            //     { user: null }
            // );
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted User Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [POST] /user/addToCart/:id  (Add 1 product when user click add to cart) :id cua user
    addToCart: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({
                $push: {
                    cart: {
                        idProduct: req.body.idProduct,
                        name: req.body.name,
                        img: req.body.img,
                        size: req.body.size,
                        quatity: req.body.quatity,
                        price: req.body.price,
                    },
                },
            });
            res.status(200).json("Thêm sản phẩm thành công!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /user/changeItemCart/:id   (change quatity item when item same type  OR use delete item)
    changeItemCart: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const idProduct = req.body.idProduct;
            const size = req.body.size;
            await user.cart.map(async (item) => {
                if (item.idProduct === idProduct && item.size === size) {
                    await user.updateOne({
                        $pull: {
                            cart: {
                                idProduct: item.idProduct,
                                size: item.size,
                            },
                        },
                    });
                }
            });

            return res.status(200).json("Cập nhật giỏ hàng thành công!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = userController;
