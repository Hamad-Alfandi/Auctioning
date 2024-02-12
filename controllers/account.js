const Seller = require("../models/seller")

async function show(req, res) {
  const sellers = await Seller.find({})

  res.render("account/show", { title: "Account", sellers })
}
//   let roleId = req.cookies["roleID"]

//   const recentProducts = await Product.aggregate([
//     {
//       $lookup: {
//         from: "auctions",
//         localField: "auction_id",
//         foreignField: "_id",
//         as: "auction",
//       },
//     },
//   ]).sort({ createdAt: -1 })
// }
module.exports = {
  show,
}
