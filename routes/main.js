const router = require('express').Router();

const authController = require('../controllers/auth.controller');

const advertisementController = require('../controllers/advertisement.controller')

const categoryController = require('../controllers/category.controller');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/reset', authController.sendResetMail)
router.get('/reset/:id', authController.checkResetToken)
router.post('/reset/:id', authController.changePassword)
// router.post('/data', authMiddleware, (req, res) => {
//     res.send('teadwsdsa')
// })
router.get('/advertisement', advertisementController.getAllAdvertisements);
router.get('/advertisement/:id', advertisementController.getAdvertisement);
router.get('/category/:id/advertisements', advertisementController.getAdvertisementsByCategory)
router.post('/advertisement/create', advertisementController.addAdvertisement);
router.delete('/advertisement/delete/:id', advertisementController.deleteAdvertisement);
router.put('/advertisement/edit', advertisementController.editAdvertisement);

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategory);
router.post('/categories', authMiddleware, (req, res) => {
    router.post('/create', categoryController.createCategory);
    router.delete('/delete/:id', categoryController.deleteCategory);
    router.patch('/edit', categoryController.editCategory);
})




module.exports = router;