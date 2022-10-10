const { Product } = require("../models/Product");
const { Category } = require("../models/Category");

const productController = {
    // [POST] /product/add  (add 1 new product)
    addNewProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            if (req.body.category) {
                const category = await Category.findById(req.body.category);
                await category.updateOne({
                    $push: { products: savedProduct._id },
                });
            }
            res.status(200).json(savedProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /product (get all products)
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ product_id: 1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /product/:id (get detail one product)
    getOneProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
                .populate("category")
                .populate("galerys");

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /product/update/:id (update one product)
    updateProduct: async (req, res) => {
        try {
            const productNeedUpdate = await Product.findById(req.params.id);
            await productNeedUpdate.updateOne({ $set: req.body });
            res.status(200).json("Updated Product Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /product/softdelete/:id    (Soft Delete Product)
    softDeleteProduct: async (req, res) => {
        try {
            const productNeedSoftDelete = await Product.findById(req.params.id);
            await productNeedSoftDelete.updateOne({ $set: { deleted: true } });
            res.status(200).json("Soft Delete Product Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /product/delete/:id (Delete one product)
    deleteProduct: async (req, res) => {
        try {
            // updateMany( query (dieu kien thoa thi tiep qua tham so t2), tri tri moi)
            await Category.updateMany(
                { products: req.params.id },
                { $pull: { products: req.params.id } }
            );
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Product Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = productController;
