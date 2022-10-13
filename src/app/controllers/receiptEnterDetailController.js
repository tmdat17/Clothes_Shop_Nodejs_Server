const { ReceiptEnterDetail } = require("../models/ReceiptEnterDetail");
const { ReceiptEnterWarehouse } = require("../models/ReceiptEnterWarehouse");
const { Product } = require("../models/Product");

const receiptEnterDetailController = {
    // [POST] /receiptEnterDetail/add
    addNewReceiptEnterDetail: async (req, res) => {
        try {
            const newReceiptEnterDetail = new ReceiptEnterDetail(req.body);
            const savedReceiptEnterDetail = await newReceiptEnterDetail.save();
            if (req.body.product) {
                const product = await Product.findById(req.body.product);
                await product.updateOne({
                    $push: { receiptEnterDetails: savedReceiptEnterDetail._id },
                });
            }

            if (req.body.receiptEnterWarehouse) {
                const receiptEnterWarehouse =
                    await ReceiptEnterWarehouse.findById(
                        req.body.receiptEnterWarehouse
                    );
                await receiptEnterWarehouse.updateOne({
                    $push: {
                        receiptEnterDetails: savedReceiptEnterDetail._id,
                    },
                });
            }
            res.status(200).json(savedReceiptEnterDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /receiptEnterDetail (get all receiptEnterDetail)
    getAllReceiptEnterDetail: async (req, res) => {
        try {
            const receiptEnterDetails = await ReceiptEnterDetail.find();
            res.status(200).json(receiptEnterDetails);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /receiptEnterDetail/:id (get detail one receiptEnterDetail)
    getOneReceiptEnterDetail: async (req, res) => {
        try {
            const receiptEnterDetail = await ReceiptEnterDetail.findById(
                req.params.id
            )
                .populate("receiptEnterWarehouse")
                .populate("product");

            res.status(200).json(receiptEnterDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /receiptEnterDetail/update/:id (update one receiptEnterDetail)
    updateReceiptEnterDetail: async (req, res) => {
        try {
            const receiptEnterDetailNeedUpdate =
                await ReceiptEnterDetail.findById(req.params.id);
            await receiptEnterDetailNeedUpdate.updateOne({ $set: req.body });
            res.status(200).json("Updated ReceiptEnterDetail Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /receiptEnterDetail/softdelete/:id    (Soft Delete receiptEnterDetail)
    softDeleteReceiptEnterDetail: async (req, res) => {
        try {
            const receiptEnterDetailNeedSoftDelete =
                await ReceiptEnterDetail.findById(req.params.id);
            await receiptEnterDetailNeedSoftDelete.updateOne({
                $set: { deleted: true },
            });
            res.status(200).json(
                "Soft Delete ReceiptEnterDetail Successfully!!"
            );
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /receiptEnterDetail/delete/:id (Delete one receiptEnterDetail)
    deleteReceiptEnterDetail: async (req, res) => {
        try {
            const product = await Product.updateOne(
                { receiptEnterDetails: req.params.id },
                { $pull: { receiptEnterDetails: req.params.id } }
            );

            const receiptEnterWarehouse = await ReceiptEnterWarehouse.updateOne(
                { receiptEnterDetails: req.params.id },
                { $pull: { receiptEnterDetails: req.params.id } }
            );
            await ReceiptEnterDetail.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted ReceiptEnterDetail Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = receiptEnterDetailController;
