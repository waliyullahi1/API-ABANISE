const Transaction = require('../model/Transactions'); 
const User = require("../model/Users");


const transactionHistory = async (req, res)=>{

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    const userId = foundUser._id;
    console.log(foundUser);
    const transactions = await Transaction.find({ user:userId }); 
    res.json(transactions)
}


module.exports=transactionHistory


