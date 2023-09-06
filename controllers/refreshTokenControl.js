const User = require("../model/Users");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  console.log(foundUser)
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETY, (err, decoded) => {
    if (err || foundUser.email !== decoded.email)
      return res.sendStatus(402);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRETY,
      { expiresIn: "10s" }
    );
    res.json({ roles, accessToken });
  });
};

module.exports = { handleLogin };
