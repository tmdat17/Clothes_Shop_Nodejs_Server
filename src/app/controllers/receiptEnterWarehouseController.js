const { ReceiptEnterWarehouse } = require("../models/ReceiptEnterWarehouse");
const { ReceiptEnterDetail } = require("../models/ReceiptEnterDetail");
const { Warehouse } = require("../models/Warehouse");

const receiptEnterWarehouseController = {
    // [POST] /ReceiptEnterWarehouse/add
    addNewReceiptEnterWarehouse: async (req, res) => {
        try {
            const newReceiptEnterWarehouse = new ReceiptEnterWarehouse(
                req.body
            );
            const saveReceiptEnterWarehouse =
                await newReceiptEnterWarehouse.save();
            if (req.body.warehouse) {
                const warehouse = await Warehouse.findById(req.body.warehouse);
                await warehouse.updateOne({
                    $push: {
                        receiptEnterWarehouses: saveReceiptEnterWarehouse._id,
                    },
                });
            }

            // if (req.body.staff){
            //     const staff = await Staff.findById(req.body.staff);
            //     await Staff.updateOne({
            //         $push: {
            //             receiptEnterWarehouses: saveReceiptEnterWarehouse._id,
            //         },
            //     });
            // }

            res.status(200).json(saveReceiptEnterWarehouse);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /receiptEnterWarehouse (get all receiptEnterWarehouse)
    getAllReceiptEnterWarehouse: async (req, res) => {
        try {
            const receiptEnterWarehouses = await ReceiptEnterWarehouse.find()
                .sort({
                    receipt_enter_id: 1,
                })
                .populate(
                    "warehouse",
                    "warehouse_id location address nameStoreKeeper deleted"
                )
                .populate(
                    "receiptEnterDetails",
                    "receiptEnterDetail_id calculation_unit cost_enter amount product deleted"
                );
            res.status(200).json(receiptEnterWarehouses);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /receiptEnterWarehouse/:id (get detetail receiptEnterWarehouse)
    getOneReceiptEnterWarehouse: async (req, res) => {
        try {
            const receiptEnterWarehouses = await ReceiptEnterWarehouse.findById(
                req.params.id
            )
                .populate("warehouse")
                .populate("receiptEnterDetails")
                .populate("staff");
            res.status(200).json(receiptEnterWarehouses);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] receiptEnterWarehouse/update/:id (Update one receiptEnterWarehouse)
    updateReceiptEnterWarehouse: async (req, res) => {
        try {
            const receiptEnterWarehouseNeedUpdate =
                await ReceiptEnterWarehouse.findById(req.params.id);
            await receiptEnterWarehouseNeedUpdate.updateOne({ $set: req.body });
            res.status(200).json(
                "Updated ReceiptEnterWarehouse Successfully!!"
            );
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /receiptEnterWarehouse/softdelete/:id (Soft Delete ReceiptEnterWarehouse)
    softDeleteReceiptEnterWarehouse: async (req, res) => {
        try {
            const receiptEnterWarehouseNeedSoftDelete =
                await ReceiptEnterWarehouse.findById(req.params.id);
            await receiptEnterWarehouseNeedSoftDelete.updateOne({
                $set: { deleted: true },
            });
            res.status(200).json(
                "Soft Delete ReceiptEnterWarehouse Successfully!!"
            );
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /receiptEnterWarehouse/delete/:id
    deleteReceiptEnterWarehouse: async (req, res) => {
        try {
            await Warehouse.updateOne(
                { receiptEnterWarehouses: req.params.id },
                { $pull: { receiptEnterWarehouses: req.params.id } }
            );

            // const staff = await Staff.updateOne(
            //     {receiptEnterWarehouses: req.params.id},
            //     {$pull: {receiptEnterWarehouses: req.params.id}}
            // )

            await ReceiptEnterWarehouse.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete ReceiptEnterWarehouse Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = receiptEnterWarehouseController;
