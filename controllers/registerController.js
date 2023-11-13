const Abanisedata = require("../model/Users");
const bcrypt = require('bcryptjs');

const generateVirtualAccount = require('./generateVirtualAcc')


const handleNewUsers = async (req, res) => {
  const { transaction, lastName, firstname, pwd, email, phone } = req.body;
  if (!transaction || !lastName || !firstname || !email || !phone || !pwd)
    return res
      .status(400)
      .json({ message: "usermane and password are require" });
  

  //check of duplicate username, phome, email, from db
  const duplicate = await Abanisedata.findOne({ email: email }).exec();
  const duplicatePhone = await Abanisedata.findOne({ phone: phone }).exec();
  
  if (duplicate) return res.status(409).json({ message: "email has already been used" });
  if (duplicatePhone) return res.status(409).json({ message: "Phone has already been used" });
 

  try {
    //encrypt  the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    
    const { accountName, accountNumber } = await generateVirtualAccount(
      email,
      firstname,
      lastName,
      phone
    );
  
    const result = await Abanisedata.create({
      lastName:lastName,
      firstname: firstname,
     transaction:transaction,
      phone: phone,
      password: hashedPwd,
      email: email,
      account_number:accountNumber ,
      account_name:accountName
    }); 

    console.log(result)
    

    
    res.status(201).json({ success : `your account created sucessful ` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUsers };