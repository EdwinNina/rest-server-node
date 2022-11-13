
const { Router } = require('express')
const { check } = require('express-validator')
const { get_categories, get_category, save_category, update_category, delete_category } = require('../controllers/categories')
const { check_category_exists } = require('../helpers/db_helpers')
const { check_jwt, check_errors, check_admin_role } = require('../middlewares')

const router = Router()

router.get('/', get_categories)

router.get('/:id', [
   check('id', 'The category id is not a valid mongo id').isMongoId(),
   check('id').custom(check_category_exists),
   check_errors
], get_category)

router.post('/', [
   check_jwt,
   check('name', 'The name field is required').not().isEmpty(),
   check_errors
], save_category)

router.put('/:id', [
   check_jwt,
   check('id', 'The category id is not a valid mongo id').isMongoId(),
   check('name', 'The name field is required').not().isEmpty(),
   check('id').custom(check_category_exists),
   check_errors
], update_category);

router.delete('/:id', [
   check_jwt,
   check_admin_role,
   check('id', 'The category id is not a valid mongo id').isMongoId(),
   check('id').custom(check_category_exists),
   check_errors
], delete_category);

module.exports = router