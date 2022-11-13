const { Router } = require('express')
const search_data = require('../controllers/search.controller')

const router = Router()

router.get('/:collection/:term', search_data)

module.exports = router