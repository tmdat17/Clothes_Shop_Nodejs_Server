const { Warehouse } = require("../models/Warehouse");
const { Product } = require("../models/Product");
const { ReceiptEnterWarehouse } = require("../models/ReceiptEnterWarehouse");

const warehouseController = {
    // [POST] /warehouse/add  (add 1 new warehouse)
    addNewWarehouse: async (req, res) => {
        try {
            const newWarehouse = new Warehouse(req.body);
            const savedWarehouse = await newWarehouse.save();

            res.status(200).json(savedWarehouse);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /warehouse/ (get all warehouses)
    getAllWarehouse: async (req, res) => {
        try {
            const warehouses = await Warehouse.find()
                .sort({ warehouse_id: 1 })
                .populate(
                    "products",
                    "product_id price name_product color deleted"
                )
                .populate(
                    "receiptEnterWarehouses",
                    "receipt_enter_id name_shipper date_ship date_sign location_enter_warehouse address_warehouse total_cost_by_text  deleted"
                );
            res.status(200).json(warehouses);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /warehouse/:id (get detail one warehouse)
    getOneWarehouse: async (req, res) => {
        try {
            const warehouse = await Warehouse.findById(req.params.id)
                .populate("products")
                .populate("receiptEnterWarehouses");

            res.status(200).json(warehouse);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /warehouse/update/:id (update one warehouse)
    updateWarehouse: async (req, res) => {
        try {
            const warehouseNeedUpdate = await Warehouse.findById(req.params.id);
            await warehouseNeedUpdate.updateOne({ $set: req.body });
            res.status(200).json("Updated Warehouse Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /warehouse/softdelete/:id (Soft Delete warehouse)
    softDeleteWarehouse: async (req, res) => {
        try {
            const warehouseNeedSoftDelete = await Warehouse.findById(
                req.params.id
            );
            await warehouseNeedSoftDelete.updateOne({
                $set: { deleted: true },
            });
            res.status(200).json("Soft Delete Warehouse Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /warehouse/delete/:id (Delete one warehouse)
    deleteWarehouse: async (req, res) => {
        try {
            await Product.updateMany(
                { warehouses: req.params.id },
                { $pull: { warehouses: req.params.id } }
            );
            await Warehouse.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Warehouse Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = warehouseController;
