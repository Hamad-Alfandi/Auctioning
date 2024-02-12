const Auction = require("../models/auction")
const Product = require("../models/product")
const Seller = require("../models/seller")
const passport = require("passport")

const { ObjectId } = require("mongodb")
function newAuction(req, res) {
  let userType = req.cookies["userType"]
  console.log("hi")
  res.render("auction/new", { title: "Add auction", errorMsg: "", userType })
}
async function showAuctions(req, res) {
  //TEMPORARY COOKIE UNTIL LOG IN CODED
  /////////////////////////////////////////////////////////////////////////////////////////////////

  res.cookie("userEmailCookie", "yas@something.com", {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  })
  res.cookie("userType", "Seller", {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  })
  res.cookie("userIdCookie", "65c755919487889fde5c20ac", {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  })
  /////////////////////////////////////////////////////////////////////////////////////////////////
  let userType = req.cookies["userType"]

  // let recentProducts = await Auction.find({}).sort({})
  // console.log('recenttttttts---------')
  // console.log(recentProducts)

  const recentProducts = await Product.aggregate([
    {
      $lookup: {
        from: "auctions",
        localField: "auction_id",
        foreignField: "_id",
        as: "auction",
      },
    },
  ]).sort({ createdAt: -1 })
  res.render("auctioning/show", { title: "Home", userType, recentProducts })
}
async function addAuction(req, res) {
  //TEMPORARY MUST BE CHANGED AFTER USER LOG IN CODED

  let productObj = {}
  let auctionObj = {}
  productObj["name"] = req.body.name
  productObj["description"] = req.body.description
  productObj["image"] = req.body.image

  auctionObj["category"] = req.body.category
  auctionObj["seller_id"] = req.cookies["userIdCookie"]
  auctionObj["endDate"] = req.body.endDate
  auctionObj["startingBid"] = req.body.startingBid
  try {
    let createdAuction = await Auction.create(auctionObj)
    productObj["auction_id"] = createdAuction._id
    await Product.create(productObj)
  } catch (err) {
    console.log(err)
  }
  console.log(auctionObj)
  res.redirect(`/auctioning`)
}

module.exports = {
  newAuction,
  addAuction,
  showAuctions,
}
