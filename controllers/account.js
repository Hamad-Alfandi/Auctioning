async function show(req, res) {
  res.render("account/show", { title: "Account" })
}
module.exports = {
  show,
}
