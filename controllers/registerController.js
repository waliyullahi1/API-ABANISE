const Abanisedata = require("../model/Users");
const bcrypt = require("bcrypt");
const generateVirtualAccount = require('./generateVirtualAcc')


const handleNewUsers = async (req, res) => {
  const { firstName, lastName, pwd, email, phone } = req.body;
  if (!firstName || !lastName || !email || !phone || !pwd)
    return res
      .status(400)
      .json({ message: "usermane and password are require" });
  

  //check of duplicate username from db
  const duplicate = await User.findOne({username: user}).exec();

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt  the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const accountNumber = await generateVirtualAccount(
      email,
      firstName,
      lastName,
      phone
    );
    // store the new users
    const result = await User.create({
      first_name: accountNumber.email,
      last_name: accountNumber.lastName,
      phone: accountNumber.phone,
      password: hashedPwd,
    }); 

    console.log(result)
    

    
    res.status(201).json({ "success ": `new ${user} was created ` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUsers };
