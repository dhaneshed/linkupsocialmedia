const nodemailer = require('nodemailer');

exports.sendEmail = async (options)=>{
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fa459d3d71c4d0",
      pass: "fb2050aeb90f00"
    }
  });

 const  mailOptions = {
  from:process.env.SMPT_MAIL,
  to:options.email,
  subject:options.subject,
  text:options.message,

 }
// var transporter = nodemailer.createTransport({
//     host: "gmail.com",
//     // port: 2525,
//     auth: {
//       user: "dhaneshkammath19@gmail.com",
//       pass: "sjknozvqhkkpdzju"
//     }
//   });

//  const  mailOptions = {
//   from:process.env.SMPT_MAIL,
//   to:options.email,
//   subject:options.subject,
//   text:options.message,

//  }







 await transporter.sendMail(mailOptions);
}