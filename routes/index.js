var express = require("express")
var router = express.Router()
const passport = require("passport")
/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" })
  console.log(req.user)
  if (req.user) {
    // && !req.user.register
    // redirect to update role page
    res.render("register")
  } else {
    res.redirect("/auctioning")
  }
})
// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)
// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
)

// OAuth logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/auctioning")
  })
})
module.exports = router
