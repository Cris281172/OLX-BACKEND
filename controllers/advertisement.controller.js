const AdvertisementService = require('../services/AdvertisementService');
const CategoryService = require('../services/CategoryService')
const User = require('../models/User')
const {faker} = require('@faker-js/faker/locale/pl');
const Advertisement = require('../models/Advertisement')

// for(let i = 0; i < 100; i++){
//     const advertisement = await Advertisement.create({
//         title: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         createdTime: 123123423423,
//         categoryID: '63b83646e2942787fb5f042c',
//         price: faker.commerce.price(),
//         userID: 4123421412,
//         location: faker.address.cityName(),
//         promoted: true,
//         views: 0,
//         status: 'nowy'
//     })
// }

module.exports = {
    addAdvertisement: async (req, res) => {
        try{

            const createdAdvertisement = await AdvertisementService.addAdvertisement(req.body);
            return res.json(createdAdvertisement);
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    getAllAdvertisements: async (req, res) => {
        try{
            const categories = await CategoryService.getAllCategories()
            let advertisements = []
            if(req.query.type === 'normal'){
                advertisements = await AdvertisementService.getAllAdvertisements(req.body);
            }
            else if(req.query.type === 'promoted'){
                advertisements = await AdvertisementService.getPromotedAdvertisements(req.body)
            }
            advertisements.advertisements = advertisements.advertisements.map(el => {
                const category = categories.find(category => category.id === el.categoryID);
                return {
                    ...el._doc,
                    categoryName: category.name
                }
            })
            return res.json(advertisements);

        }
        catch(err){
            res.status(500).json({error: err});
        }
    },

    getAdvertisement: async (req, res) => {
        try{
            const advertisement = await AdvertisementService.getAdvertisement(req.params.id);
            const categories = await CategoryService.getAllCategories();
            const category = categories.find(category => category.id === advertisement.categoryID);
               res.send({
                   ...advertisement._doc,
                   categoryName: category.name
               })
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    getPromotedAdvertisements: async(req ,res) => {

        try{
            const promotedAdvertisements = await AdvertisementService.getPromotedAdvertisements(req.query.page - 1, req.query.limit)
            console.log(promotedAdvertisements)
            return res.json(promotedAdvertisements);
      }
      catch(err){
          res.status(500).json({error: err})
      }
    },
    getAdvertisementsByCategory: async(req, res) => {
        try{
            const advertisementsByCategory = await AdvertisementService.getAdvertisementsByCategory(req.params.id)
            return res.json(advertisementsByCategory);
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    deleteAdvertisement: async (req, res) => {
        try{
            const deleteAdvertisement = await AdvertisementService.deleteAdvertisement(req.params.id);
            if(deleteAdvertisement !== undefined){
                res.status(500).send(deleteAdvertisement);
            }
            else{
                res.send(200);
            }
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    editAdvertisement: async (req, res) => {
        try{
            const editAdvertisement = await AdvertisementService.editAdvertisement(req.body);
            console.log(editAdvertisement);
            res.status(200).send("Element edited")
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    addAdvertisementToFavorite: async (req, res) => {
        try{

        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}

