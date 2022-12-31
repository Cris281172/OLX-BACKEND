const Category = require('../models/Category');
const CategoryService = require('../services/CategoryService');

module.exports = {
    createCategory: async(req, res) => {
        try{
            const {name} = req.body;
            const checkCreatedCategory = await Category.findOne({
                name: {
                    $eq: name
                }
            })
            if(checkCreatedCategory){
                return res.status(409).send('Category already exists');
            }
            const createdCategory = await CategoryService.createCategory(req.body);
            res.status(201).send(createdCategory);
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    getAllCategories: async(req ,res) => {
        try{
            res.json(await CategoryService.getAllCategories());
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    getCategory: async(req, res) => {
        try{
            const category = await CategoryService.getCategory(req.params.id);
            return res.json(category);
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    deleteCategory: async(req, res) => {
        try{
            const deletedCategory = await CategoryService.deleteCategory(req.params.id);
            if(deletedCategory !== undefined){
                res.status(500).send(deletedCategory);
            }
            else{
                res.send(200);
            }
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    editCategory: async(req, res) => {
        try{
            console.log(req.body)
            const editedCategory = await CategoryService.editCategory(req.body);
            res.status(200).send(editedCategory);
        }
        catch(err){
            res.status(500).json({error: err});
        }
    }
}