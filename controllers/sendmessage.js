const nodemailer = require('nodemailer');



const sendmessage = async (email, codes) => {
  

  let pinHtml = codes.map((pin, index) => `
  <tr style ="margin: 10px 40px; font-family: arial, sans-serif; width: 1000px">
    <td style="  font-size:18px; " >${index + 1}</td>
    <td style="  font-size:18px;">${pin.name}</td>
    <td style="  font-size:18px; ">${pin.pin}</td>
    <td style="  font-size:18px; ">${pin.seriaNo}</td>
  </tr>
`).join('');
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'waliuwaheed2021@gmail.com', 
        pass: 'onxr sqvu qtwa eblk'
      }
    });

    let mailOptions = {
      from: '"no-reply"info@abaniseedu.com', 
      to: email, 
      subject: 'Your Purchase on abanise ', 
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:5173/verify/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`, // plain text body

//     html: `
     
//     <div style="width:80%;  display: flex; justify-self: center; border: 2px solid rgb(0, 71, 0);  border: 2px;   margin: 90px 20px; ">
//     <div>
//      <div class=" rappersw" style=" background-color:rgb(0, 71, 0);  border: 12px solid rgb(0, 71, 0); text-align: center; width: 100%; margin: 10px 20px;   color: white;">
//        <h1  style="font-size:25px; text-align: center; font-weight:500;">abaniseedu</h1>
//        <p style="font-size:15px; text-align: center; font-weight:500; ">YOUR TRANSACTION DETAILS ARE AS FOLLOWS:</p>
//        <p   style="font-size:15px; text-align: center; font-weight" class=" ">Your Successful purchased  Pin</p>
//        </div>
//      <p style="font-size:15px; padding-left: 40px;  margin-left: 20px;">look the link below to view the entire pin you have purchase</p>
//      <div style="padding-left: 40px; padding-top:40px:  margin-left: 20px;">
//         <table style="width:100%;  text-align: center;" >
//                  <tr style="">
//                    <th class="cols">No </th>
//                    <th>ExamType</th>
//                    <th>Pin</th>
                  
//                    <th>Seria no</th>
//                  </tr>
//                  <tbody >
//                  ${pinHtml}
//                </tbody>
//                </table>
//      </div>
//      <p style=" margin-top: 20px; ">If you encounter any issue while using this PIN, please send a mail to  within 7 days from now.</p>
//        <div class=" rappersw" style="   background-color: red;   text-align: center; width: 100%; margin: 10px 20px;   color: white;">
//        <h1  style="font-size:20px; text-align: center; font-weight:500;">Thanks for your Subscription</h1>
//        </div>
//     </div>
 
//  </div>
//     `
     };


     transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send('Error sending email.');
      return  email    
     });
 
};
  module.exports = sendmessage;