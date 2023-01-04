const { response } = require("express");
const { promisify } = require("util");
const handlebars = require("handlebars");

const express = require("express");
const fs = require("fs");
const readFile = promisify(fs.readFile);

const transporter = require("./mailconfig");

const sendMail = async (request, response) => {
  const { name, from, to, subject, text, html } = request.body;
  const template = fs.readFileSync("./src/mail.html", "utf8");

  const compiledTemplate = handlebars.compile(template);

  const data = {
    name: "John",
    age: 30,
  };
  // send mail with defined transport object
  let info = await transporter.sendMail(
    {
      from: `"${name}" <${from}>`, // sender address
      to: `${to}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `${text}`, // plain text body
      html: compiledTemplate(data)
    },
    function (err, success) {
      if (err) return response.status(400).json({ message: err });
      return response.status(400).json({ message: success });
    }
  );
  //   console.log(name, from, to, subject, text, html );
};

module.exports = {
  sendMail,
};
