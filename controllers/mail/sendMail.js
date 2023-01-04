const { response } = require("express");
const { promisify } = require("util");
const handlebars = require("handlebars");
const express = require("express");
const fs = require("fs");
const readFile = promisify(fs.readFile);

const transporter = require("./mailconfig");

const sendMail = async (email, oneTimePassword) => {
  // const { name, from, to, subject, text, html } = request.body;
  const template = fs.readFileSync("./controllers/mail/mail.html", "utf8");

  const compiledTemplate = handlebars.compile(template);
  console.log(oneTimePassword)
  const data = {
    text: "You have sent a mail to oconfirm you password change. Enter the OTP in the site to confirm it",
    OTP: oneTimePassword,
  };
  console.log("we came")
  // send mail with defined transport object
  let info = await transporter.sendMail(
    {
      from: '"NodeMail" <gyamfiowusu630@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Request to Reset Password", // Subject line
      text: "Body", // plain text body
      html: compiledTemplate(data),
    },
    function (err, success) {
      console.log("here")
      if (err) return err;
      return success;
    }
  );
  // console.log(name, from, to, subject, text, html );
};

module.exports = {
  sendMail,
};
