const Schema = mongoose.Schema;

const FoundHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Abanisedata'
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


  status:{
    type: String,
    required: true
  },

});

module.exports = mongoose.model('FoundHistory', FoundHistorySchema );