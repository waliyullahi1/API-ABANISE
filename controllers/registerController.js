const Abanisedata = require("../model/Users");
const bcrypt = require("bcrypt");
const generateVirtualAccount = require('./generateVirtualAcc')


const handleNewUsers = async (req, res) => {
  const { firstname, lastName, pwd, email, phone } = req.body;
  if (!firstname || !lastName || !email || !phone || !pwd)
    return res
      .status(400)
      .json({ message: "usermane and password are require" });
  

  //check of duplicate username from db
  const duplicate = await Abanisedata.findOne({ email: email }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt  the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const accountNumber = await generateVirtualAccount(
      email,
      firstname,
      lastName,
      phone
    );
    // store the new users
    const result = await Abanisedata.create({
      first_name: firstname,
      last_name: lastName,
      phone: phone,
      password: hashedPwd,
      email: email,
      account_number: accountNumber,
    }); 

    console.log(result)
    

    
    res.status(201).json({ "success ": `new ${user} was created ` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUsers };