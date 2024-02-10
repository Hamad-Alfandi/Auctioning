const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    image: String,
    category: {
      type: String,
      required: true,
      enum: [
        'Home Living',
        'Clothing',
        'Bags',
        'Jewelry',
        'Beauty',
        'Collectibles',
        'Art',
        'Books'
      ],
      default: 'Home Living'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', productSchema)
