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
};

module.exports = userController;
