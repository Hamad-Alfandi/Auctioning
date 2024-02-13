const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    register: { type: Boolean, default: false },
    role: { type: String, default: 'buyer', enum: ['buyer', 'seller'] },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller' },
    buyerId: { type: Schema.Types.ObjectId, ref: 'Buyer' }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('User', userSchema)
