const express = require('express');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        min : 6,
        max : 255
    },
    email : {
        type: String,
        required: true,
        min: 6,
        max : 255
    }, 
    password : {
        type: String,
        required: true,
        min: 6,
        max : 1024    
    },
    dateJoined : {
        type : Date,
        default: Date.now
    },
    last_login :{
        type : Date,
        default : Date.now
    },
    isAdmin : {
        type : Boolean,
        deafult: false
    },
    resetToken: {
        type: String
    }
    
})


module.exports = mongoose.model('User', userSchema)