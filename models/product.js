const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Auction = require('../models/auction')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    auction_id: {
      type: Schema.Types.ObjectId,
      ref: 'Auction'
    },
    description: {
      type: String
    },
    image: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', productSchema)
