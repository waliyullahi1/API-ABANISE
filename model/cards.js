const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const cardScheme = new Scheme({
  name: {
    type: String,
    require: true,
  },
  pin: {
    type: String,
    require: true,
  },

  amount:{
    type: Number,
    require: true,
  },

  seriaNo: String 
 
});

module.exports = mongoose.model("Card_pin", cardScheme);