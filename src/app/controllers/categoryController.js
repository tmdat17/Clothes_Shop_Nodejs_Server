const { Category } = require("../models/Category");
const { Product } = require("../models/Product");

const categoryController = {
    // [POST] /category/add  (add 1 new category)
    addNewCategory: async (req, res) => {
        try {
            const newCategory = new Category(req.body);
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /category (get all categorys)
    getAllCategory: async (req, res) => {
        try {
            const categorys = await Category.find();
            res.status(200).json(categorys);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /category/:id (get detail one category)
    getOneCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id).populate(
                "products"
            );
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /category/update/:id (update category)
    updateCategory: async (req, res) => {
        try {
            const categoryNeedUpdate = await Category.findById(req.params.id);
            await categoryNeedUpdate.updateOne({ $set: req.body });
            res.status(200).json("Updated Category Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /cateogory/softdelete/:id  (Soft Delete category)
    softDeleteCategory: async (req, res) => {
        try {
            const categoryNeedSoftDelete = await Category.findById(
                req.params.id
            );
            await categoryNeedSoftDelete.updateOne({ $set: { deleted: true } });
            res.status(200).json("Soft Deleted Category Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /category/delete/:id (Delete category)
    deleteCategory: async (req, res) => {
        try {
            await Product.updateMany(
                { category: req.params.id },
                { category: null }
            );
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Category Successfully!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = categoryController;
