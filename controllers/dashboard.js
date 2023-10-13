const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const Transaction = require('../model/Transactions'); 

const dashboard = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  console.log(foundUser)
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  
  res.json({  foundUser  }) 
};

module.exports = dashboard ;