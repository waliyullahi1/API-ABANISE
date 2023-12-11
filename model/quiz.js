const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const quizScheme = new Scheme({
  phone: {
    type: String,
    require: true,
  },
  refreshtoken: {
    type: String,
    require: true,
  },


 
});

module.exports = mongoose.model("savequiz", quizScheme);