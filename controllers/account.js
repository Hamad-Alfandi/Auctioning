// const Buyer = require("../models/buyer")
// const Seller = require("../models/seller")
// const Review = require("../models/review")
// const User = require("../models/user")
// const seller = require("../models/seller")
// const { deserializeUser } = require("passport")

// const addReview = async (req, res) => {
//   const buyer = await Buyer.findOne({ userId: req.params.id })
//   const seller = await Seller.findById(req.body.seller_id)

//   const review = await Review.create({
//     reviewRate: req.body.reviewRate,
//     seller_id: req.body.seller_id,
//     buyer_id: buyer._id,
//     description: req.body.description,
//   })

//   console.log(review)

//   buyer.reviews.push(review)
//   seller.reviews.push(review)

//   await seller.save()
//   await buyer.save()

//   res.redirect(`/account/${req.params.id}`)
// }
// async function show(req, res) {
//   const sellers = await Seller.find({})
//   const user = await User.findById(req.params.id)
//   let currentUser
//   if (user && user.role === "seller") {
//     currentUser = await Seller.findOne({
//       userId: req.params.id,
//     }).populate("reviews")
//   } else {
//     currentUser = await Buyer.findOne({
//       userId: req.params.id,
//     }).populate("reviews")
//   }

//   res.render("account/show", {
//     title: "Account",
//     sellers,
//     reviews: currentUser.reviews,

//   })
// }

// module.exports = {
//   show,
//   addReview,
// }

const Buyer = require("../models/buyer")
const Seller = require("../models/seller")
const Review = require("../models/review")
const User = require("../models/user")
const seller = require("../models/seller")

const { deserializeUser } = require("passport")
const Auction = require("../models/auction")
const mongoose = require("mongoose")
const addReview = async (req, res) => {
  const buyer = await Buyer.findOne({ userId: req.params.id })
  const seller = await Seller.findById(req.body.seller_id)
  const review = await Review.create({
    reviewRate: req.body.reviewRate,
    seller_id: req.body.seller_id,
    buyer_id: buyer._id,
    description: req.body.description,
  })
  console.log(review)
  buyer.reviews.push(review)
  seller.reviews.push(review)
  await seller.save()
  await buyer.save()
  res.redirect(`/account/${req.params.id}`)
}
async function show(req, res) {
  const sellers = await Seller.find({})
  const user = await User.findById(req.params.id)
  let currentUser
  if (user && user.role === "seller") {
    currentUser = await Seller.findOne({
      userId: req.params.id,
    }).populate("reviews")
  } else {
    currentUser = await Buyer.findOne({
      userId: req.params.id,
    }).populate("reviews")
  }
  ///////////
  // const products = await Product.create({
  //   name: req.body.name,
  //   auction_id: product.auction_id,
  //   description: req.body.description,
  //   image: req.file,
  // })
  //////////

  res.render("account/show", {
    title: "Account",
    sellers,
    reviews: currentUser.reviews,
    // result,
  })
}

module.exports = {
  show,
  addReview,
}
