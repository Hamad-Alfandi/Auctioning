const Auction = require('../models/auction')
const Product = require('../models/product')
const Seller = require('../models/seller')

const { ObjectId } = require('mongodb')
function newAuction(req, res) {
  let userType = req.cookies['userType']
  let userId = req.cookies['userIdCookie']
  res.render('auction/new', {
    title: 'Add auction',
    userId,
    errorMsg: '',
    userType
  })
}

async function updateBid(req, res) {
  let userId = req.cookies['userIdCookie']
  let auctionId = req.params.Auctionid
  const update = { highestBid: req.body.bidPrice, buyer_id: userId }
  try {
    await Auction.findOneAndUpdate(
      { _id: auctionId },
      { $set: update },
      { new: true }
    )
  } catch (error) {
    console.log(`error:${error}`)
  }

  res.redirect(`/auctioning`)
}

async function showAuction(req, res) {
  let userType = req.cookies['userType']
  let userId = req.cookies['userIdCookie']
  let productId = req.params.Productid
  const productDetails = await Product.findOne({ _id: productId })

  let auctionId = productDetails.auction_id
  const auctionDetails = await Auction.findOne({
    _id: auctionId
  })

  let sellerId = auctionDetails.seller_id

  // const sellerDetails = await Seller.findOne({
  //   _id: sellerId
  // })
  const sellerDetails = await Seller.findOne({
    _id: sellerId
  })

  res.render('auction/auctionDetails', {
    title: 'Auction Details',
    userType,
    userId,
    productDetails,
    auctionDetails,
    sellerDetails
  })
}
async function showAuctions(req, res) {
  //TEMPORARY COOKIE UNTIL LOG IN CODED
  /////////////////////////////////////////////////////////////////////////////////////////////////
  res.cookie('userEmailCookie', 'yas@something.com', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  res.cookie('userType', 'Seller', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  res.cookie('userIdCookie', '65c755919487889fde5c20ac', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  /////////////////////////////////////////////////////////////////////////////////////////////////
  let userType = req.cookies['userType']
  let userId = req.cookies['userIdCookie']
  const recentProducts = await Product.aggregate([
    {
      $lookup: {
        from: 'auctions',
        localField: 'auction_id',
        foreignField: '_id',
        as: 'auction'
      }
    }
  ]).sort({ createdAt: -1 })
  res.render('auctioning/show', {
    title: 'Home',
    userType,
    userId,
    recentProducts
  })
}
async function addAuction(req, res) {
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
  res.redirect(`/auctioning`)
}

module.exports = {
  newAuction,
  addAuction,
  showAuctions,
  showAuction,
  updateBid
}
