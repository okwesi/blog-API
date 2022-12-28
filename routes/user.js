const express = require('express');
const controllers = require('../controllers/user')
const verify = require('../verification')

const router = express.Router();


router.post('/signup', controllers.signup) 
router.post('/signin', controllers.signin)
router.get('/getUser', verify.authorization, controllers.getUser)
module.exports = router;