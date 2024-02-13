var express = require('express')
var router = express.Router()
const accountCtrl = require("../controllers/account")
/* GET home page. */
router.get("/:id", accountCtrl.show)
router.get('/', function (req, res, next) {
  res.render('auctioning/account', { title: 'Account' })
})


module.exports = router
