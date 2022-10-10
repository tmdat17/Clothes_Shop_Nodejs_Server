const { Galery } = require("../models/Galery");
const { Product } = require("../models/Product");

const galeryController = {
    // [POST] /galery/add  (add 1 new galery)
    addNewGalery: async (req, res) => {
        try {
            const newGalery = new Galery(req.body);
            const savedGalery = await newGalery.save();
            if (req.body.product) {
                const product = await Product.findById(req.body.product);
                await product.updateOne({
                    $push: { galerys: savedGalery._id },
                });
            }
            res.status(200).json(savedGalery);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /galery (get all galery)
    getAllGalery: async (req, res) => {
        try {
            const galerys = await Galery.find().sort({ galery_id: 1 });
            res.status(200).json(galerys);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /galery/:id (get detail one product)
    getOneGalery: async (req, res) => {
        try {
            const galery = await Galery.findById(req.params.id).populate(
                "product"
            );
            res.status(200).json(galery);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /galery/update/:id (Update one galery)
    updateGalery: async (req, res) => {
        try {
            const galeryNeedUpdate = await Galery.findById(req.params.id);
            await galeryNeedUpdate.updateOne({ $set: req.body });
            res.status(200).json("Updated Galery Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /galery/softdelete/:id (Soft Delete Galery)
    softDeleteGalery: async (req, res) => {
        try {
            const galeryNeedSoftDelete = await Galery.findById(req.params.id);
            await galeryNeedSoftDelete.updateOne({ $set: { deleted: true } });
            res.status(200).json("Soft Delete Galery Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /galery/delete/:id (Delete one galery)
    deleteGalery: async (req, res) => {
        try {
            await Product.updateMany(
                { galerys: req.params.id },
                { $pull: { galerys: req.params.id } }
            );
            await Galery.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Galery Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = galeryController;
