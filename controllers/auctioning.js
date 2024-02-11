const Auction = require("../models/auction")
const Product = require("../models/product")
const Seller = require("../models/seller")

const showCategories =async (req, res) => {

  // res.cookie("userType", "Seller", {
  //   expires: new Date(Date.now() + 900000),
  //   httpOnly: true,

  // })
  const categories = await Product.findById(req.params.id);

  console.log("categoriescategories", categories)

  let userType = req.cookies["userType"]

  res.render("auctioning/categories", { userType })

}





module.exports = {
  showCategories,
}
