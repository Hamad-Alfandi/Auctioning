var express = require("express")
var router = express.Router()
const Product = require("../models/product")
const Auction = require("../models/auction")
// const auction = require("../models/auction")

/* GET home page. */
router.get("/", async function (req, res, next) {
  const categories = await Product.find({})

  // console.log("aaaa",categories)
  res.render("categories/show", { title: "All Categories", categories })
})

// GET request for a specific category
// GET request for a specific category or all products if no category specified
router.get("/:category", async function (req, res, next) {
  const encodedCategory = req.params.category

  const auctions = await Auction.find({ category: req.params.category })
  // .populate("products")
  // const product = await auction.find({category: req.params.category})



// console.log("category: ", category)
// console.log("product", product)
// const result = await Product.aggregate([
//   {
//     $match: { category: req.params.name } // Match auctions with the specified category
//   },
//   {
//     $lookup: {
//       from: "products", // The name of the collection to join
//       localField: "_id", // The field from the "auctions" collection
//       foreignField: "auction_id", // The field from the "products" collection
//       as: "matchedProducts" // The alias for the resulting array of matched products
//     }
//   }
// ]);
///////////////////////////
// console.log(req.params.category)
const result = await Product.aggregate([
  {
    $match: { category: req.params.category }
  },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "auction_id",
      as: "matchedProducts"
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      description: 1,
      matchedProducts: {
        $filter: {
          input: `$matchedProducts`,
          as: "product",
          cond: { $eq: ["$$product.category", auctions] }
        }
      }
    }
  }
]);
////////////////////////////
const auctionsWithProducts = result.map(auction => {
  const matchedProducts = auction.matchedProducts.filter(product => product.category === req.params.category);
  return {
    ...auction,
    matchedProducts: matchedProducts
  };
});

console.log("result:", result);
console.log("auctionsWithProducts", auctionsWithProducts)
  if (encodedCategory) {
    const decodedCategory = decodeURIComponent(encodedCategory)

    // Assuming your Product model has a field called 'category'
    // const categoryProducts = await Product.find({ category: decodedCategory })

    // console.log(categoryProducts)
    res.render(`categories/category`, {
      title: decodedCategory,
      // categoryProducts,
      auctions,
      // product,
      auctionsWithProducts
    })
  } else {
    // Fetch all products if no category specified
    const allProducts = await Product.find({})
    console.log(allProducts)
    res.render("auctioning/products", {
      title: "All Products",
      products: allProducts,
    })
  }
})

module.exports = router
