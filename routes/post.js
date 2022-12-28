const express = require('express');
const controllers = require('../controllers/post')
const verify = require('../verification')

const router = express.Router();


router.get('/',  controllers.getPosts) 
router.post('/', verify.authorization, controllers.createPost)
router.get('/:id', controllers.getPost)
router.delete('/:id', controllers.deletepost)
router.patch('/:id', controllers.updatePost)

router.post('/:id/like', verify.authorization, controllers.likePost)
router.post('/:id/unlike', verify.authorization, controllers.unlikePost)
module.exports = router;