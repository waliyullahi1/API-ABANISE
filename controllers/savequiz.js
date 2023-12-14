const savequizs = require('../model/quiz'); 

const savequiz = async (phone) =>{
    const newTransaction =  await savequizs.create({
   
      phone:phone,
     
    });

 
}
    module.exports = savequiz