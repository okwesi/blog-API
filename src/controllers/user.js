const { response, request } = require("express");
const express = require("express");
const User = require("../src/models/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mail = require("./mail/sendMail")


// validation
const SignupSchema = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().email().min(6).max(255).required(),
  password: Joi.string()
    .required()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});


const SigninSchema = Joi.object({
  email: Joi.string().email().min(6).max(255).required(),
  password: Joi.string().required(),
});

const signup = async (request, response) => {
  const { error, validatedData } = SignupSchema.validate(request.body);
  if (error) return response.status(400).json(error.details[0].message);

  const { name, email, password } = request.body;

  const userExist = await User.findOne({ email: email });
  if (userExist)
    return response.status(400).json("User with email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: hashPassword,
  });

  try {
    const saveduser = await user.save();
    response.json({ user_id: user._id });
  } catch (err) {
    response.status(400).json(err);
  }
};

const signin = async (request, response) => {
  const { error, validatedData } = SigninSchema.validate(request.body);
  if (error) return response.status(400).json(error.details[0].message);

  const { email, password } = request.body;

  const user = await User.findOne({ email: email });
  if (!user)
    return response.status(400).json("User with this email does not exist");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return response.status(400).json("Password is not correct");

  const token = jwt.sign({ _id: user._id }, "kennethisboss");
  response.header("Authorization", token).json(token);
};   

const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.user._id);
    response.json(user);
  } catch (err) {
    response.json({ message: err });
  }
};


function generateOTP() {
  var digits = '0123456789';
  var OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;}

const sendEmailForConfirmation = async (request, response) => {
  const {email} = request.body
  let oneTimePassword = generateOTP();

  try {
    const sendMail = await mail.sendMail(email, oneTimePassword)
    return response.json({message:"email sent",
                          OTP: oneTimePassword})
  }catch(err){
    return response.status(400).json({error_message: err})
  }
}


const resetPassword = async (request, response) => {
  const { email, password } = request.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const setPassword = await User.updateOne(
      { email: email },
      {
        $set: {
          password: hashPassword,
        },
      }
    );
    return response.status(201).json({
      message: "Password Updated",
      body: setPassword,
    });
  } catch (err) {
    response.json({ message: err });
  }
};

const changePassword = async (request, response) => {
  const { oldPassword, newPassword } = request.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findById(request.user._id);
    await bcrypt.compare(oldPassword, user.password, async function (err, res) {
      if (res === false) return response.status(400).json({ message: "Old Password is wrong" });
        await  User.updateOne(
          { _id: request.user._id },
          {
            $set: {
              password: hashPassword,
            },
          }
        );
        return response.status(201).json({message:"Password Changed"})
     
    });
  } catch (err) {
    response.status(500).json({ message: err });
  }
};

module.exports = {
  signup,
  signin,
  getUser,
  resetPassword,
  changePassword,
  sendEmailForConfirmation
};

