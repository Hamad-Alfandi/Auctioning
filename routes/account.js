var express = require("express")
var router = express.Router()
const accountCtrl = require("../controllers/account")

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("auctioning/account", { title: "Account" })
})
router.post("/:id/reviews", accountCtrl.addReview)
router.get("/:id", accountCtrl.show)
module.exports = router
