var express = require('express')
var router = express.Router()
const auctionsCtrl = require('../controllers/auctions')
const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage()
})
/* GET home page. */
router.get('/:Productid', auctionsCtrl.showAuction)
router.put('/bid/:Auctionid', auctionsCtrl.updateBid)
router.get('/:Productid/edit', auctionsCtrl.edit)
router.put('/:Productid', auctionsCtrl.updateAuction)
router.delete('/:Productid', auctionsCtrl.deleteAuction)
router.get('/', auctionsCtrl.newAuction)
router.post('/', upload.single('image'), auctionsCtrl.addAuction)
module.exports = router
