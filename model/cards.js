const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const cardScheme = new Scheme({
  name: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
 
});

module.exports = mongoose.model("Card_pin", cardScheme);