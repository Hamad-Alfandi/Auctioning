const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    reviewRate: {
      type: Number,
      required: true,
    },

    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    buyer_id: {
      type: Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },
    description: {
      //text description from buyer as review
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Review", reviewSchema)
