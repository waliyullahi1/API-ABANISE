const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const abaniseScheme = new Scheme({
  first_name: {
    type: String,
    require: true,
  },

  roles: {
    User: {
      type: String,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },

  phone: {
    type: String,
    require: true,
  },
  preferred_bank: {
    type: String,
    default: "wema-bank",
  },
  refreshToken: String,
});

module.exports = mongoose.model("Abanisedata", abaniseScheme);
