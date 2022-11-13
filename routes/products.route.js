const {Router} = require('express');
const { check } = require('express-validator');

const { get_products, 
   get_product, 
   save_product, 
   update_product, 
   delete_product } = require('../controllers/products.controller');

const { check_product_exists } = require('../helpers/db_helpers');
const { check_jwt, check_errors, check_admin_role } = require('../middlewares');

const router =  Router();

router.get('/', get_products)

router.get('/:id', get_product)

router.post('/', [
   check_jwt,
   check('name', 'The name field is required').not().isEmpty(),
   check_errors
], save_product)

router.put('/:id', [
   check_jwt,
   check('id', 'The id is not a valid mongo id').isMongoId(),
   check('id').custom(check_product_exists),
   check('name', 'The name field is required').not().isEmpty(),
   check_errors
], update_product)

router.delete('/:id', [
   check_jwt,
   check_admin_role,
   check('id', 'The id is not a valid mongo id').isMongoId(),
   check('id').custom(check_product_exists),
   check_errors
], delete_product)

module.exports = router;

