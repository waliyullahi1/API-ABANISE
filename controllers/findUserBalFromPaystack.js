
const axios = require("axios");

const getCustomerByEmail = async (req, res) => {
   const email = req.body;
   const url = `https://api.paystack.co/customer?email=${email}`;
   const headers = {
     Authorization: ` Bearer ${process.env.PAYSTACK_SECRETY_CODE}`,
     "Content-Type": "application/json",
   };

  try {
    const response = await axios.get(url, { headers: headers });
    const customer = response.data.data[0];
    console.log(customer);
    return customer;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getCustomerByEmail;


