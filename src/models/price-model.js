const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Number,
      //unique: true
    },
    good_id: {
      type: Number
    },
    good: {
        type: String
      },
    category_id: {
        type: Number
      },
    brand: {
        type: String
      },
    price: {
        type: Number
      },
    rating: {
        type: Number
      },
    photo: {
        type: String
      }                                  
  });
  const Price = mongoose.model('Price', PriceSchema);
  module.exports = Price;