const User = require('../model/Users')
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)return res.status(400).json({ "message": "Username and password are required." });;
  const foundUser = await User.findOne({email: email}).exec()
  if (!foundUser) return res.sendStatus(402); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {

    const roles =  Object.values(foundUser.roles)
    // create JWTs
    const accessToken = jwt.sign(
      { "UserInfo":{
        "email": foundUser.email,
         "roles":roles
      }  },
      process.env.ACCESS_TOKEN_SECRETY,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRETY,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
  foundUser.refreshToken = refreshToken

    const result = await foundUser.save()

    console.log(result);
    res.cookie("jwt", refreshToken, {httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
    
  } else {
    res.sendStatus(402);
  }
};

module.exports = { handleLogin };
