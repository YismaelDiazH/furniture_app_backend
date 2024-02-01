const router = require('express').Router();
const productController = require('../controllers/productControllers');


router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProduct)
router.post('/', productController.createProduct)
router.get('/search/:key', productController.searchProduct);


module.exports = router