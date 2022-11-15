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
                "cart",
                "_id product_id name_product price price_discount color"
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
                    cart: req.body.productId,
                },
            });
            res.status(200).json("Thêm sản phẩm thành công!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = userController;
