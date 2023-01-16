const Condition = require('../models/Condition')

module.exports = class ConditionService {
    static async getAllConditions(){
        try{
            return await Condition.find();
        }
        catch(err){
            console.log(err);
        }
    }
    static async createCondition({name}){
        try{
            const newCondition = {
                name: name,
            }
            return await new Condition(newCondition).save();
        }
        catch(err){
            console.log(err);
        }
    }
    static async getCondition(id){
        try{
            return Condition.findOne({
                _id: {
                    $eq: id,
                }
            })
        }
        catch(err){
            console.log(err);
        }

    }
}