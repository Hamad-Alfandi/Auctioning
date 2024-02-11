const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buyerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    googleId: {
      type: String,
      required: true
    },
    email: String,
    reviews: [
      {
        type: Schema.types.objectId,
        ref: 'Review'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Buyer', buyerSchema)
