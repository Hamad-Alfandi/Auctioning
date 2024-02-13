var express = require('express')
var router = express.Router()
const { body, validationResult } = require('express-validator')
const auctionsCtrl = require('../controllers/auctions')

/* GET home page. */
router.get('/:Productid', auctionsCtrl.showAuction)
router.put('/bid/:Auctionid', auctionsCtrl.updateBid)
router.get('/:Productid/edit', auctionsCtrl.edit)
router.put('/:Productid', auctionsCtrl.updateAuction)
router.delete('/:Productid', auctionsCtrl.deleteAuction)
router.get('/', auctionsCtrl.newAuction)
router.post('/', auctionsCtrl.addAuction)
module.exports = router
