const Found = require('../model/found'); 
const axios = require('axios')


const fundHistory = async (req, res)=>{

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    const userId = foundUser._id;
    const transactions = await Found.find({ user:userId }).sort({transactionDate: -1}); 
    res.json(transactions)
}


module.exports= fundHistory

