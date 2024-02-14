const Auction = require('../models/auction')
const Product = require('../models/product')
const Seller = require('../models/seller')
const passport = require('passport')
const s3 = require('../config/aws-config')
const { ObjectId } = require('mongodb')

const auction = require('../models/auction')
const crypto = require('crypto')


function newAuction(req, res) {
  let userType
  let userId
  if (req.user && req.user.role === "seller") {
    userType = req.user.role
    userId = req.user.sellerId
  } else {
    userType = null
    userId = null
  }
  res.render("auction/new", {
    title: "Add auction",
    userId,
    errorMsg: "",
    userType,
  })
}

async function updateBid(req, res) {
  let userType
  let userId
  if (req.user && req.user.role === "buyer") {
    userType = req.user.role
    userId = req.user.buyerId
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
    _id: auctionId,
  })

  let sellerId = auctionDetails.seller_id

  let belongToUser = false //checks if the auction belongs to the user seller logged in
  if (req.user) {
    userType = req.user.role
    if (userType === "seller") {
      userId = req.user.sellerId

      if (sellerId.toString() == userId) {
        belongToUser = true
      }
    } else if (userType === "buyer") {
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
    _id: sellerId,
  })

  const currentTime = new Date()
  const timeRemaining = auctionDetails.endDate - currentTime
  // const timeLeft = formatTime(timeRemaining)
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
  const timeLeft = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  res.render('auction/auctionDetails', {
    title: 'Auction Details',
    userType,
    userId,
    belongToUser,
    timeLeft,
    productDetails,
    auctionDetails,
    sellerDetails,
  })
}

async function showAuctions(req, res) {
  let userType
  let userId
  if (req.user) {
    userType = req.user.role
    if (req.user.role === "seller") {
      userId = req.user.sellerId
    } else if (req.user.role === "buyer") {
      userId = req.user.buyerId
    }
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
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $limit: 9
    }
  ])


  res.render("auctioning/show", {
    title: "Home",
    userType,
    userId,
    recentProducts,
  })
}

async function addAuction(req, res) {
  let userId
  if (req.user) {
    userId = req.user.sellerId
  } else {
    userId = null
  }

  let productObj = {}
  let auctionObj = {}

  let productImage = req.file
  let imageURL

  const randomBytes = crypto.randomBytes(16)
  let randImageName = randomBytes.toString('hex')

  let s3Params = {
    Bucket: 'eliteauctions-productimages',
    Key: randImageName,
    Body: productImage.buffer
  }

  const data = await s3.upload(s3Params).promise()
  imageURL = data.Location
  productObj['image'] = imageURL.toString()

  productObj['name'] = req.body.name
  productObj['description'] = req.body.description
  auctionObj['category'] = req.body.category
  auctionObj['seller_id'] = userId
  auctionObj['endDate'] = req.body.endDate
  auctionObj['startingBid'] = req.body.startingBid

  try {
    let createdAuction = await Auction.create(auctionObj)
    productObj["auction_id"] = createdAuction._id
    await Product.create(productObj)
  } catch (err) {
    console.log(err)
  }
  res.redirect(`/auctioning`)
}
async function edit(req, res) {
  let productId = req.params.Productid
  const productDetails = await Product.findOne({ _id: productId })

  let auctionId = productDetails.auction_id
  const auctionDetails = await Auction.findOne({
    _id: auctionId
  })
  let sellerId = auctionDetails.seller_id
  let title = 'Update Auction'
  res.render('auction/edit', {
    title,
    productDetails,
    auctionDetails,
    sellerId
  })
}
async function updateAuction(req, res) {
  let userId
  if (req.user) {
    userId = req.user.sellerId
  } else {
    userId = null
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

  const productIdObject = new ObjectId(req.params.Productid)
  try {
    await Product.updateOne(
      { _id: productIdObject },
      {
        $set: productObj
      }
    )
    let product = await Product.findById(req.params.Productid)
    let auctionId = new ObjectId(product.auction_id)
    await Auction.updateOne(
      { _id: auctionId },
      {
        $set: auctionObj
      }
    )
  } catch (err) {
    console.log(err)
  }
  res.redirect(`/auctioning`)
}

async function deleteAuction(req, res) {
  let product = await Product.findById(req.params.Productid)
  let productId = new ObjectId(req.params.Productid)
  let auctionId = new ObjectId(product.auction_id)
  try {
    await Auction.deleteOne(auctionId)
    await Product.deleteOne(productId)
  } catch (error) {
    console.log(error)
  }

  res.redirect(`/auctioning`)
}

module.exports = {
  newAuction,
  addAuction,
  showAuctions,
  showAuction,
  updateBid,

  edit,
  updateAuction,
  deleteAuction

}
