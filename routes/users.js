const { Router } = require('express');
const { check } = require('express-validator');
const { get_users, post_users, put_users, delete_users } = require('../controllers/users');

const { check_admin_role, check_jwt, check_errors } = require('../middlewares')
const { check_role, check_email_exists, check_user_exists } = require('../helpers/db_helpers');

const router = Router();

router.get('/', get_users)

router.post('/', [
   check('name', 'The field name is required').not().isEmpty(),
   check('email', 'The field email is not validated').isEmail(),
   check('password', 'The field password must be at least 6 characters').isLength({min: 6}),
   // check('role', 'The role in not a valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   check('email').custom(check_email_exists),
   check('role').custom(check_role),
   check_errors
], post_users)

router.put('/:id', [
   check('id', 'The user id is not a valid mongo id').isMongoId(),
   check('id').custom(check_user_exists),
   check('role').custom(check_role),
   check_errors
], put_users)

router.delete('/:id', [
   check_jwt,
   check_admin_role,
   check('id', 'The user id is not a valid mongo id').isMongoId(),
   check('id').custom(check_user_exists),
   check_errors
], delete_users)

module.exports = router;