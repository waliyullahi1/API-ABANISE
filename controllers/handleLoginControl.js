const User = require('../model/Users')
const bcrypt = require("bcrypt");
const getCustomerByAccountNumber = require("./findUserBalFromPaystack");
const jwt = require("jsonwebtoken");


const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)return res.status(400).json({ "message": "Username and password are required." });
  const foundUser = await User.findOne({email: email}).exec()
  if (!foundUser) return res.status(402).json({ message: "Invalid email" });
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
      { expiresIn: "60m" }
    );
    // Saving refreshToken || wallent balance with current user
    const newfound = await getCustomerByAccountNumber(foundUser.account_number);
    foundUser.walletBalance += newfound;
    console.log(newfound, '0000000');
    // foundUser.walletBalance = account;
  foundUser.refreshToken = refreshToken
     

    const result = await foundUser.save()

   
    res.cookie("jwt", refreshToken, { httpOnly: true,
      secure: true,
      // sameSite: 'strict',
  
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, result,  });
    
  } else {
    return res.status(402).json({ message: "Invalid email or Password " });
  }
};

module.exports = { handleLogin };
