var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  //TEMPORARY COOKIE UNTIL LOG IN CODED
  /////////////////////////////////////////////////////////////////////////////////////////////////
  res.cookie('userEmailCookie', 'yas@something.com', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  res.cookie('userType', 'Seller', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  res.cookie('userIdCookie', '65c755919487889fde5c20ac', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  /////////////////////////////////////////////////////////////////////////////////////////////////
  let userType = req.cookies['userType']
  res.render('auctioning/show', { title: 'Home', userType })
})

module.exports = router
