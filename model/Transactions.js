const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  transactionDate: {
    type: String,
    required: true
  },

  arrangeDate: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,

  refid:{
    type: String,
    required: true
  },

 oldwallet: {
    type: String,
    required: true
  },
 newwallet:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },

  recipient:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },

  value:{
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);