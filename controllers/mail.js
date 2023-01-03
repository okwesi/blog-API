const nodemailer = require("nodemailer");
require('dotenv').config()


let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

module.exports = transporter;
