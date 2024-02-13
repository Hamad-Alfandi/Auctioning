var express = require("express")
var router = express.Router()
const usersCtrl = require("../controllers/users")

// put /users/:id )update)
router.put("/:id", usersCtrl.update)

module.exports = router
