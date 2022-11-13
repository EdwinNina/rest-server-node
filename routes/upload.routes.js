const { Router } = require('express');
const { check } = require('express-validator');

const { upload_files, 
   get_model_image, 
   upload_image_cloudinary } = require('../controllers/uploads.controller');

const { allowed_collections } = require('../helpers/db_helpers');
const { check_image, check_errors } = require('../middlewares');

const router = Router()

router.post('/', check_image, upload_files);

router.put('/:collection/:id', [
   check_image,
   check('id', 'The id is not a valid mongo id').isMongoId(),
   check_errors
], upload_image_cloudinary)

router.get('/:collection/:id', [
   check('id', 'The id is not a valid mongo id').isMongoId(),
   check('collection').custom(c => allowed_collections(['users', 'products'], c)),
   check_errors
], get_model_image)

module.exports = router