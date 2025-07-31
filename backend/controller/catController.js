const Category = require('../models/catMaster');
//get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get all categories by id
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};
//add categories
exports.createCategory = async (req, res) => {
    
        const pitems= new Category({
            catname: req.body.catname
        });
        const category = await pitems.save();
        if(!category){
  return res.status(404).json({ message: 'Category not inserted' });
        }
        res.json(category);
       
    }
//update categories
exports.updateCategory = async (req, res) => {
    try {
        const cat = req.params.id;
        const updatedCategory = await Category.findByIdAndUpdate(
            cat,
            { $set: { catname: req.body.catname } },
            { new: true } 
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//delete category
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
