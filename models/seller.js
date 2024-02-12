const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
    },
    Rating: {
      type: Number, // average rating calculated in backend before updating
      default: 0,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    auctions: [{ type: Schema.Types.ObjectId, ref: "Auction" }],

    userID: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Seller", sellerSchema)
