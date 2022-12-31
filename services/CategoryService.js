const Category = require('../models/Category');

module.exports = class CategoryService{
    static async createCategory({name}){
        try{
            const newCategory = {
                name: name,
            }
            return await new Category(newCategory).save();
        }
        catch(err){
            return err;
        }
    }
    static async getAllCategories(){
        try{
            return await Category.find();
        }
        catch(err){
            return err;
        }
    }
    static async getCategory(id){
        try{
            return await Category.findOne({
                _id: {
                    $eq: id
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }
    static async deleteCategory(id){
        try{
            await Category.deleteOne({
                _id: id
            })
        }
        catch(err){
            return err
        }
    }
    static async editCategory(data){
        try{
            const id = data.id;
            delete data.id;
            return await Category.updateOne({
                _id: id
            }, data, {
                multi: false,
                upsert: false,
            })
        }
        catch(err){
            console.log(err);
        }
    }
}