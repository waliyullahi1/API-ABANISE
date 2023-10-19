const Transaction = require('../model/Transactions'); 
const User = require("../model/Users");


const transactionHistory = async (req, res)=>{

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    const userId = foundUser._id;
    const transactions = await Transaction.find({ user:userId }).sort({transactionDate: -1}); 
    res.json(transactions)
}


module.exports=transactionHistory


