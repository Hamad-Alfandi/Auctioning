var express = require("express")
var router = express.Router()
const Product = require('../models/product')

const categoriesCtrl = require("../controllers/auctioning")

/* GET home page. */
router.get("/", async function (req, res, next) {


  const categories = await Product.find({})

  console.log("categoriescategories", categories)
  // console.log("r")
  
  res.render("auctioning/categories", { title: "All Categories" ,categories})


})

module.exports = router
