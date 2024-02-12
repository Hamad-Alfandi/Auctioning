const Auction = require('../models/auction')
const Product = require('../models/product')
const Seller = require('../models/seller')

const { ObjectId } = require('mongodb')
function newAuction(req, res) {
  let userType = req.cookies['userType']
  console.log('hi')
  res.render('auction/new', { title: 'Add auction', errorMsg: '', userType })
}
async function showAuction(req, res) {
  let userType = req.cookies['userType']
  let userId = req.cookies['userIdCookie']
  // console.log('paraaaaaams:')
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

  console.log(`the product: ${productDetails}`)
  console.log(`the auction: ${auctionDetails}`)
  console.log(`the seller: ${sellerDetails}`)

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
  res.cookie('userEmailCookie', 'kamal@something.com', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  res.cookie('userType', 'Buyer', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  res.cookie('userIdCookie', '65c9fee133f292736d3e7f7f', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  /////////////////////////////////////////////////////////////////////////////////////////////////
  let userType = req.cookies['userType']

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
  res.render('auctioning/show', { title: 'Home', userType, recentProducts })
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
  showAuction
}
