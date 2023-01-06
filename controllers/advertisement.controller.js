const AdvertisementService = require('../services/AdvertisementService');
const CategoryService = require('../services/CategoryService')

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
            const allAdvertisements = await AdvertisementService.getAllAdvertisements();
            const categories = await CategoryService.getAllCategories()


            const allAdvertisementsWithCategory = allAdvertisements.map(el => {
                const category = categories.find(category => category.id === el.categoryID);
                return {
                    ...el._doc,
                    categoryName: category.name
                }
            })


            return res.json(allAdvertisementsWithCategory);
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
          const promotedAdvertisements = await AdvertisementService.getPromotedAdvertisements()
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

