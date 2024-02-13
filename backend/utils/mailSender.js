// utils/mailSender.js
const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service:"gmail",
      host: process.env.MAIL_HOST,
      auth: {
        type:"login",
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
        tls: {
          rejectUnauthorized: false
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log("Error occurred while sending email: ",error.message);
    throw error;
  }
};
module.exports = mailSender;