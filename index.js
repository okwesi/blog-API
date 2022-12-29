const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()



const postRoute = require('./routes/post')
const userRoute = require('./routes/user')


const app = express()
const port = 5000;

// Middlewares
app.use(express.json());
app.use(cors())


// routes
app.use('/post', postRoute)
app.use('/users', userRoute)


app.listen(port, () => {
    console.log(`Server started on Port ${port}`)
})


mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("connected to mongo dbee")
})
