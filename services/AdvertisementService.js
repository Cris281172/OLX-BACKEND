const Advertisement = require('../models/Advertisement');

module.exports = class AdvertisementService{
    static async addAdvertisement({title, description, createdTime, categoryID, price, userID, location, promoted, views, status}){
        try{
            const newAdvertisement = {
                title: title,
                description: description,
                createdTime: createdTime,
                categoryID: categoryID,
                price: price,
                userID: userID,
                location: location,
                promoted: promoted,
                views: views,
                status: status
            }

            return await new Advertisement(newAdvertisement).save();
        }
        catch(err){
            console.log(err);
        }
    }
    static async getAllAdvertisements(){
        try{
            return await Advertisement.find();
        }
        catch(err){
            console.log(err);
        }
    }
    static async getAdvertisement(id){
        try{
            return await Advertisement.findOne({
                _id: {
                    $eq: id
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }
    static async getPromotedAdvertisements(){
        try{
            return await Advertisement.find({
                promoted: {
                    $eq: true
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }
    static async getAdvertisementsByCategory(id){
        try{
            return await Advertisement.find({
                categoryID: {
                    $eq: id
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }
    static async deleteAdvertisement(id){
        try{
            await Advertisement.deleteOne({
                _id: id
            })
        }
        catch(err){
            console.log(err);
        }
    }
    static async editAdvertisement(data){
        try{
            const id = data._id;
            console.log(id);
            return await Advertisement.updateOne({
                _id: id
            }, data, {
                multi: false,
                upsert: false
            })
        }
        catch(err){
            console.log(err);
        }
    }
}