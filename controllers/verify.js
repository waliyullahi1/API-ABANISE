
const jwt = require('jsonwebtoken');
const User = require("../model/Users");

// const verify = (req, res, ) => {
//   const token = req.body.token;
//   jwt.verify(token, process.env.REFRESH_TOKEN_SECRETY, function(err, decoded) {
//     if (err) {
//       res.status(403).send('Invalid token');
//     } else {
//       res.status(200s).send('Token is valid');
//     }
//   });
// };


const verify = async (req, res, next) => {
  const token = req.body.token;
  
 

  if (token == null) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRETY, async (err, decoded) => {
      if (err) {
        
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(402).json({ message: "Token expired" });
        } else {
          return res.status(402).json({ message: "Invalid token" });
        }
      } else {
        
        const foundUser = await User.findOne({ email: decoded.email });

        if (!foundUser || foundUser.email !== decoded.email) {
          return res.status(402).json({ message: "Invalid email" });
        }

        // If everything is good, save to request for use in other routes
        req.decoded = decoded;
        return res.json({ message: "sucesssful" })
        // next();
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}








module.exports = verify
