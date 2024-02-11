var express = require('express')
var router = express.Router()
const auctionsCtrl = require('../controllers/auctions')

/* GET home page. */
router.get('/', auctionsCtrl.newAuction)
router.post('/', auctionsCtrl.addAuction)

module.exports = router
