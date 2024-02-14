var express = require('express')
var router = express.Router()
const Product = require('../models/product')
const Auction = require('../models/auction')
const categorysCtrl = require('../controllers/categories')

router.get('/search', categorysCtrl.search)
router.get('/', categorysCtrl.show)
router.get('/:category', categorysCtrl.showCategory)

module.exports = router
