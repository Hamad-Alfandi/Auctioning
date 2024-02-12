const User = require("../models/user")
const Seller = require("../models/seller")
const Buyer = require("../models/buyer")
const { ObjectId } = require("mongodb")
// function that update user role & register
const update = async (req, res) => {
  const user = await User.findById(req.params.id)
  const convertedId = new ObjectId(req.params.id)
  const convertedId = new ObjectId(req.params.id)
  user.role = req.body.role
  user.register = true
  let roleCollectionObj = {}
  if (user.role === "seller") {
    const sellerCollec = await Seller.findOne({
      userId: convertedId,
    })
    if (sellerCollec) {
      user.sellerId = sellerCollec._id
    } else {
      roleCollectionObj = {}
      roleCollectionObj.userId = user._id
      roleCollectionObj.name = user.name
      Seller.insertMany(roleCollectionObj)
    }
  } else if (user.role === "buyer") {
    const buyerCollec = await Buyer.findOne({
      userId: convertedId,
    })
    if (buyerCollec) {
      user.buyerId = buyerCollec._id
    } else {
      roleCollectionObj = {}
      roleCollectionObj.userId = user._id
      roleCollectionObj.name = user.name
      Buyer.insertMany(roleCollectionObj)
    }
  }
  await user.save()

  res.redirect("/auctioning")
}
module.exports = {
  update,
}
