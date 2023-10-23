const Found = require('../model/found'); 
const axios = require('axios')
const User = require("../model/Users");

const fundHistory = async (req, res)=>{

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    const email = foundUser.email;
    const fund = await Found.find({ email:email }).sort({timestamp : 1}); 
    res.json(fund)
}


module.exports= fundHistory

