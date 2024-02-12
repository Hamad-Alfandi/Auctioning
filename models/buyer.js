const mongoose = require("mongoose")
const Schema = mongoose.Schema

const buyerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.types.objectId,
      required: true,
      ref: "User",
    },

    email: String,
    reviews: [
      {
        type: Schema.types.objectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Buyer", buyerSchema)
