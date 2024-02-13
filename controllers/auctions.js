const Auction = require('../models/auction')
const Product = require('../models/product')
const Seller = require('../models/seller')
const passport = require('passport')

const { ObjectId } = require('mongodb')
function newAuction(req, res) {
  let userType
  let userId
  if (req.user && req.user.role === 'seller') {
    userType = req.user.role
    userId = req.user.sellerId
    console.log(`found a user, type is: ${userType} role id is ${userId}`)
  } else {
    userType = null
    userId = null
  }
  res.render('auction/new', {
    title: 'Add auction',
    userId,
    errorMsg: '',
    userType
  })
}

async function updateBid(req, res) {
  let userType
  let userId
  if (req.user && req.user.role === 'buyer') {
    userType = req.user.role
    userId = req.user.buyerId
    console.log(`found a user, type is: ${userType} role id is ${userId}`)
  } else {
    userType = null
    userId = null
  }
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
  let userType
  let userId

  let productId = req.params.Productid
  const productDetails = await Product.findOne({ _id: productId })

  let auctionId = productDetails.auction_id
  const auctionDetails = await Auction.findOne({
    _id: auctionId
  })

  let sellerId = auctionDetails.seller_id

  let belongToUser = false //checks if the auction belongs to the user seller logged in
  if (req.user) {
    userType = req.user.role
    if (userType === 'seller') {
      userId = req.user.sellerId
      console.log(`seller id: ${sellerId}   req seller id: ${userId}`)
      if (sellerId.toString() == userId) {
        belongToUser = true
      }
    } else if (userType === 'buyer') {
      userId = req.user.buyerId
    }
  } else {
    userType = null
    userId = null
  }
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
    belongToUser,
    productDetails,
    auctionDetails,
    sellerDetails
  })
}

async function showAuctions(req, res) {
  console.log(`the user:${req.user}`)
  let userType
  let userId
  if (req.user) {
    userType = req.user.role
    if (req.user.role === 'seller') {
      userId = req.user.sellerId
    } else if (req.user.role === 'buyer') {
      userId = req.user.buyerId
    }
    console.log(`found a user, type is: ${userType} role id is ${userId}`)
  } else {
    userType = null
    userId = null
  }
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
  let userId
  if (req.user) {
    console.log(
      `user found in add auction with role id of ${req.user.sellerId}`
    )
    userId = req.user.sellerId
  } else {
    userId = null
    console.log('no user found in add auction')
  }
  let productObj = {}
  let auctionObj = {}
  productObj['name'] = req.body.name
  productObj['description'] = req.body.description
  productObj['image'] = req.body.image

  auctionObj['category'] = req.body.category
  auctionObj['seller_id'] = userId
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
