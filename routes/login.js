const { Router } = require('express');
const { check } = require('express-validator');
const { login_user } = require('../controllers/login');

const router = Router()

router.post('/login', [
   check('email', 'The field email is not validated').isEmail(),
   check('password', 'The field password is required').not().isEmpty()
], login_user);

module.exports = router