const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
 
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;