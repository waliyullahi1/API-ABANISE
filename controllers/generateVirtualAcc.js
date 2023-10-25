const axios = require("axios");


// const createCustomerAndVirtualAccount = async () => {
//   const url = 'https://api.paystack.co/customer';
//   const headers = {
//     'Authorization': 'Bearer YOUR_SECRET_KEY',
//     'Content-Type': 'application/json'
//   };
//   const customerData = {
//     'email': 'CUSTOMER_EMAIL',
//     'first_name': 'CUSTOMER_FIRST_NAME',
//     'last_name': 'CUSTOMER_LAST_NAME',
//     'phone': 'CUSTOMER_PHONE_NUMBER'
//   };

//   try {
//     // Create a new customer
//     const customerResponse = await axios.post(url, customerData, { headers });
//     console.log(customerResponse.data);

//     // Create a virtual account for the new customer
//     const virtualAccountUrl = 'https://api.paystack.co/dedicated_account';
//     const virtualAccountData = {
//       'customer': customerResponse.data.data.customer_code,
//       'preferred_bank': 'wema-bank'
//     };
    
//     const virtualAccountResponse = await axios.post(virtualAccountUrl, virtualAccountData, { headers });
//     console.log(virtualAccountResponse.data);
    
//   } catch (error) {
//     console.error(error);
//   }
// };

// createCustomerAndVirtualAccount();



const  generateVirtualAccount = async (customerEmail,firstName,lastName,phone) => {
  
  const url = 'https://api.paystack.co/customer';
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRETY_CODE}`,
    "Content-Type": "application/json",
  };

  const data = {
    'email': customerEmail,
    'first_name': firstName,
    'last_name': lastName,
    'phone': phone
  };

  try {
    const customerResponse = await axios.post(url, data, { headers });
    console.log(customerResponse.data);
    const virtualAccountUrl = 'https://api.paystack.co/dedicated_account';
    const virtualAccountData = {
      'customer': customerResponse.data.data.customer_code,
      'preferred_bank': 'wema-bank'
    };
    
    const virtualAccountResponse = await axios.post(virtualAccountUrl, virtualAccountData, { headers });
    console.log(virtualAccountResponse.data.data.account_name,virtualAccountResponse.data.data.account_number);
    return{
      accountName: virtualAccountResponse.data.data.account_name,
      accountNumber: virtualAccountResponse.data.data.account_number
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the virtual account' });
  }
};


// const generateVirtualAccount = async (customerEmail,firstName,lastName,phone) => {
//   const customerEmail= 'adiojubril2023@gmail.com'
//   const firstName= 'adio'
//   const lastName= 'jubril'
//   const url = "https://api.paystack.co/dedicated_account";
//   const headers = {
//     Authorization: ` Bearer ${process.env.PAYSTACK_SECRETY_CODE}`,
//     "Content-Type": "application/json",
//   };
//   console.log(headers.Authorization)
//   const data = {
//     customer: customerEmail,
//     first_name: firstName,
//     last_name: lastName,
//     phone: phone,
//     preferred_bank: "wema-bank", 
//   };

//   try {
//     const response = await axios.post(url, data, { headers: headers });
//     return response.data.data.account_number, response.data.data.account_name;
//   } catch (error) {
//     console.error(error);
//   }
// };
module.exports = generateVirtualAccount;