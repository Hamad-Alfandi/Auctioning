var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('auctioning/categories', { title: 'All Categories' })
})

module.exports = router
