const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceRoofSchema = new Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    service_id: {
      type: Number
    },
    service: {
        type: String
      },
    unit: {
        type: String
      },
    price: {
        type: Number
      },
    rating: {
        type: Number
      },  
    foto: {
        type: String
      }                                  
  });
  const PriceRoof = mongoose.model('PriceRoof', PriceRoofSchema);
  module.exports = PriceRoof;