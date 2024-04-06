const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoutes");
const crypto = require('crypto');

// Generate a random token key
// const generateTokenKey = () => {
//   return crypto.randomBytes(64).toString('hex');
// };
// console.log(generateTokenKey());

const app = express()

require('dotenv').config()

const MONGO_URL  = process.env.MONGO_URL
const port = 9000
mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=> console.log('Connected')).catch((err)=> console.log(err))


app.listen(port, ()=>console.log(port))

app.use(cors({
    origin:['http://localhost:9000'],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(cookieParser());

app.use(express.json())

app.use('/',authRoute)