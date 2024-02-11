const Auction = require('../models/auction')
const Product = require('../models/product')
const Seller = require('../models/seller')
const { ObjectId } = require('mongodb')
function newAuction(req, res) {
  let userType = req.cookies['userType']
  res.render('auction/new', { title: 'Add auction', errorMsg: '', userType })
}

async function addAuction(req, res) {
  //TEMPORARY MUST BE CHANGED AFTER USER LOG IN CODED

  let productObj = {}
  let auctionObj = {}
  productObj['name'] = req.body.name
  productObj['description'] = req.body.description
  productObj['image'] = req.body.image

  auctionObj['category'] = req.body.category
  auctionObj['seller_id'] = req.cookies['userIdCookie']
  auctionObj['endDate'] = req.body.endDate
  auctionObj['startingBid'] = req.body.startingBid
  try {
    let createdAuction = await Auction.create(auctionObj)
    productObj['auction_id'] = createdAuction._id
    await Product.create(productObj)
  } catch (err) {
    console.log(err)
  }
  console.log(auctionObj)
  res.redirect(`/auctioning`)
}

module.exports = {
  newAuction,
  addAuction
}
