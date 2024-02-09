const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email:{ 
    type: String,
    required:true,
  },
  Rating:{
    type: Number,
    enum:[0,1,2,3,4,5]
  },
  reviews:[reviewSchema],
  auctions:[auctionSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Seller', sellerSchema);






