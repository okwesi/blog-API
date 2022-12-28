const express = require('express');
const mongoose = require('mongoose');
const User = require('./User')

const postSchema = mongoose.Schema({

    description : {
        type: String,
    }, 
    dateTime : {
        type: Date,
        default: Date.now
    },
    image : {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

})


module.exports = mongoose.model('Posts', postSchema)