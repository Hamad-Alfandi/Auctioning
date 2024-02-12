const Seller = require("../models/seller")

async function show(req, res) {
  const seller = res.render("account/show", { title: "Account", Seller })
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
