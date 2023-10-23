const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoundSchema = new Schema({
  email: {
    type: String,
    required: true
    },
    dateShow:{
      type: String,
      required: true
      },
  customerId:{
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },

  amount:{
    type: Number,
    required: true
  },

  timestamp:{
    type: String,
    required: true
  },

  status:{
    type: String,
    required: true
  },

});

module.exports = mongoose.model('Found', FoundSchema );