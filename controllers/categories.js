const Auction = require('../models/auction')
const Product = require('../models/product')
const passport = require('passport')
const { ObjectId } = require('mongodb')
const product = require('../models/product')

async function show(req, res) {
  const categories = await Product.find({})
  res.render('categories/show', { title: 'All Categories', categories })
}
async function showCategory(req, res) {
  let category = req.params.category
  const categoryProducts = await Product.aggregate([
    {
      $lookup: {
        from: 'auctions',
        localField: 'auction_id',
        foreignField: '_id',
        as: 'auction'
      }
    },
    {
      $match: {
        'auction.category': category
      }
    }
  ])
  let title = `${req.params.category} Auctions`
  res.render('categories/category', {
    title,
    categoryProducts
  })
}

async function search(req, res) {
  let productsFound
  let toSearch
  try {
    toSearch = req.query.query
    console.log(`---------------to search query: ${toSearch}`)
    productsFound = await Product.find({
      name: { $regex: new RegExp(toSearch, 'i') }
    })
  } catch (err) {
    console.log(err)
  }
  res.render('categories/search', {
    title: 'Search Results',
    toSearch,
    productsFound
  })
}

module.exports = {
  show,
  showCategory,
  search
}
