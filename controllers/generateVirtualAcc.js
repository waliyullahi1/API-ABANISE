const axios = require("axios");

const generateVirtualAccount = async (customerEmail,firstName,lastName,phone
) => {
  const url = "https://api.paystack.co/dedicated_account";
  const headers = {
    Authorization: PAYSTACK_SECRETY_CODE,
    "Content-Type": "application/json",
  };
  const data = {
    customer: customerEmail,
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    preferred_bank: "wema-bank", 
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    return response.data.data.account_number;
  } catch (error) {
    console.error(error);
  }
};
module.exports = generateVirtualAccount;