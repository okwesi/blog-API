const express = require('express');
const controllers = require('../controllers/user')
const verify = require('../verification')

const router = express.Router();


router.post('/signup', controllers.signup) 
router.post('/signin', controllers.signin)
router.get('/getUser', verify.authorization, controllers.getUser)
router.post('/resetPassword', controllers.resetPassword)
module.exports = router;

// $2a$10$KQZZrUa8ftXG4734Ebl3HeJY26HK4ax7B5V4GRw2NeEBDxKMJkgYe