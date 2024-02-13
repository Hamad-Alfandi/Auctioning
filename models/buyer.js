const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buyerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    email: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Buyer', buyerSchema)
