const Abanisedata = require("../model/Users");
const bcrypt = require("bcrypt");
const generateVirtualAccount = require('./generateVirtualAcc')


const handleNewUsers = async (req, res) => {
  const { transaction, username, pwd, email, phone } = req.body;
  if (!transaction || !username || !email || !phone || !pwd)
    return res
      .status(400)
      .json({ message: "usermane and password are require" });
  

  //check of duplicate username, phome, email, from db
  const duplicate = await Abanisedata.findOne({ email: email }).exec();
  const duplicatePhone = await Abanisedata.findOne({ phone: phone }).exec();
  const duplicateusername = await Abanisedata.findOne({ username: username }).exec()

  if (duplicateusername) return res.status(409).json({ message: "username has already been used" });
  if (duplicate) return res.status(409).json({ message: "email has already been used" });
  if (duplicatePhone) return res.status(409).json({ message: "Phone has already been used" });
 

  try {
    //encrypt  the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // const accountNumber = await generateVirtualAccount(
    //   email,
    //   firstname,
    //   lastName,
    //   phone
    // );
    // store the new users
    const result = await Abanisedata.create({
    
     username: username,
     transaction:transaction,
      phone: phone,
      password: hashedPwd,
      email: email,
      account_number: '111111',
    }); 

    console.log(result)
    

    
    res.status(201).json({ success : `your account created sucessful ` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUsers };