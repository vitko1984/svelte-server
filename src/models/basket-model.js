const mongoose = require('mongoose');

const basketSchema = mongoose.Schema({
  price_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PriceRoof'
  },
  client: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  total_price: {
    type: Number,
    required: true
  },

  items: [{}]
});

const Basket = mongoose.model('Basket', basketSchema);
module.exports = Basket;