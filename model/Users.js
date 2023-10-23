const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const abaniseScheme = new Scheme({
  firstname: {
    type: String,
    require: true,
  },

  lastName: {
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
  transaction: {
    type: String,
    require: true,
  },

  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  account_number: {
    type: String,
    require: true,
  },
  account_name: {
    type: String,
    require: true,
  },
  preferred_bank: {
    type: String,
    default: "wema-bank",
  },

  walletBalance: {
    type: Number,
    default: 0, 
  },
  resetToken: String,
  refreshToken: {
    type: String,
    default: undefined,
    index: { expires: '1m' }, 
  },
});

module.exports = mongoose.model("Abanisedata", abaniseScheme);

