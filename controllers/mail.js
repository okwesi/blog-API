const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "gyamfiowusu630@gmail.com",
    pass: "jujkzafsyudbnmdx", // generated ethereal password
  },
});

module.exports = transporter;
