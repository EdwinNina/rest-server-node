
const check_errors = require('../middlewares/custom_middlewares');
const check_jwt = require('../middlewares/check_jwt');
const check_admin_role = require('../middlewares/check_role');
const check_image = require('../middlewares/check_image');

module.exports = {
   ...check_errors,
   ...check_jwt,
   ...check_admin_role,
   ...check_image
}