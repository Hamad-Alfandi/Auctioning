const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: String,
    category: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Product", productSchema)
