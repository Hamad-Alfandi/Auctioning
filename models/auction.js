const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema(
  {
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    startingBid: {
      type: Number,
      required: true
    },
    highestBid: Number,
    buyer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer'
    }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('Auction', auctionSchema)
