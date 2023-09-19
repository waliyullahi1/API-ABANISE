const axios = require('axios')
const {format} = require('date-fns')
const url = "https://sandbox.vtpass.com/api/pay"
const headers = {
    "Content-Type":"application/json",
    "api-key":"a010d9cbacb589344f35db21e847ff1d",
    "secret-key":"SK_80164128cd3835d08dc2173e9f7004204145c2ce010"
};
const hours = "11"

   
    



const airtimeForAllNewtwork = async (req, res) =>{
    const { serviceID, amount, phone } = req.body;
    // const date = format(now, 'yyyyMMddHHmmss') 
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Africa/Lagos');
    const now = new Date();
    const id = `${format(now, 'yyyyMMdd')}${hours}${format(now, 'mmss')}fkj2`
    
    const data = {
       'request_id':id,
        'serviceID': serviceID,
        'billersCode': phone, 
        'amount': amount, 
        'phone': phone
    }

    try {
        const response = await axios.post(url, data, {headers:headers});
        console.log('ggggggggg',);response.data.content.transactions.status  
        res.json(response.data)
        

    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while processing your request.')
    }    
    
   console.log('result');
}


const dataBundleForAllNewtwork = async (req, res) =>{
    const { serviceID, amount, phone,billersCode, variation_code,} = req.body;
     const now = new Date();
    const id = `${format(now, 'yyyyMMdd')}${hours}${format(now, 'mmss')}fkj2`
    
    const data = {
      request_id:id, 
      serviceID: serviceID,
      billersCode: billersCode, 
      variation_code:variation_code,// 'mtn-10mb-100', 
      amount: amount, 
      phone: phone
    }

    try {
        const response = await axios.post(url, data, {headers:headers});
       const status = res.json(response.data)

    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while processing your request.')
    }
}



module.exports = {airtimeForAllNewtwork, dataBundleForAllNewtwork}
