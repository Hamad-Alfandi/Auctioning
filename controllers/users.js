const User = require("../models/user")

// function that update user role & register
const update = async (req, res) => {
  const user = await User.findById(req.params.id)

  user.role = req.body.role
  user.register = true
  await user.save()
  // res.redirect("/auctioning")
}
module.exports = {
  update,
}
