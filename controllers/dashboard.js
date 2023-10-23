const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const Transaction = require('../model/Transactions'); 
const fund = require('../model/found'); 

const dashboard = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403); //Forbidden
  const transactions = await Transaction.find({ user: foundUser._id }).sort({ transactionDate: -1 });
  const funds = await fund.find({ email: foundUser.email }).sort({ transactionDate: 1 });

  // Calculate total amount
  let totalAmountSpent = 0;
  if (transactions) {
    totalAmountSpent = transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  let totalAmountfund = 0;
  if (funds) {
    totalAmountfund = funds.reduce((total, fund) => total + fund.amount, 0);
  }
  res.json({ foundUser, totalAmountSpent, totalAmountfund }) 
};

module.exports = dashboard;
