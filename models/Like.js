const express = require('express');
const mongoose = require('mongoose');
const User = require('./User')
const Post = require('./Post')


const likeSchema = mongoose.Schema({

    
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    dateTime : {
        type: Date,
        default: Date.now
    },

})


module.exports = mongoose.model('Like', likeSchema)