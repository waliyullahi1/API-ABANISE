const User = require('../model/quiz')
const savequiz = require('../controllers/savequiz')


const jwt = require("jsonwebtoken");


const functionQiuz = async (req, res) => {
  const { phoneNo,networktype  } = req.body;
  if (!phoneNo || !networktype)return res.status(400).json({ "message": "Username and password are required." });
  const phoneFound = await User.findOne({phone: phoneNo}).exec()
  if (phoneFound) return res.status(402).json({ message: "Your phone number are already been used before, try it again next time" });
  // find if device are already been used
  const cookies = req.cookies;
  if (cookies?.quizsession) return res.sendStatus(401).json({ message: "Your device  are already been used before, try it again next time" });

    // create JWTs
    const refreshToken = jwt.sign(
      { phoneNo },
      process.env.REFRESH_TOKEN_SECRETY,
      { expiresIn: "5d" }
    );

  const save = await savequiz( phoneNo, refreshToken);

   
    res.cookie("quizsession", refreshToken, { httpOnly: true,
      secure: true,
      
  
      sameSite: "None",
      // secure: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, result,  });
    

};

module.exports = { functionQiuz };
