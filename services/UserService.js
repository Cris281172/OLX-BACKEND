const User = require('../models/User')

module.exports = class UserService{
    static async getUser(id){
        try{
            return await User.findOne({
                _id: {
                    $eq: id
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }
}