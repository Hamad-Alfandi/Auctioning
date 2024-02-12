var express = require("express")
var router = express.Router()
const Product = require("../models/product")
const Category = require("../models/auction")


/* GET home page. */
router.get("/", async function (req, res, next) {
  const categories = await Product.find({})

  console.log(categories)
  res.render("categories/show", { title: "All Categories", categories })
})

// GET request for a specific category
// GET request for a specific category or all products if no category specified
router.get("/:category", async function (req, res, next) {
  const encodedCategory = req.params.category;
  
  const category = await Category.find({category : req.params.category})

  // console.log("bb ",category)


  if (encodedCategory) {
    const decodedCategory = decodeURIComponent(encodedCategory);

    // Assuming your Product model has a field called 'category'
    const categoryProducts = await Product.find({ category: decodedCategory });

    console.log(categoryProducts);
    res.render(`categories/category`, { title: decodedCategory, categoryProducts, category });
  } else {
    // Fetch all products if no category specified
    const allProducts = await Product.find({});
    console.log(allProducts);
    res.render("auctioning/products", { title: "All Products", products: allProducts });
  }
});


module.exports = router
