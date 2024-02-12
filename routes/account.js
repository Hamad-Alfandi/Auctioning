var express = require("express")
var router = express.Router()
const accountCtrl = require("../controllers/account")
/* GET home page. */
router.get("/:id", accountCtrl.show)

module.exports = router
