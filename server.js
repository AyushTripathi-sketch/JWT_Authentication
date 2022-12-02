const express = require('express')
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes')
const {connectDB} = require('./config/db')
const compression = require('compression');
const sendEmail = require('./utils/email');
const app = express()

dotenv.config();
connectDB()
sendEmail();

app.use(compression())
app.use(express.json())
app.use('/api/users',userRoutes)

app.listen(5000,console.log("Server listening on Port 5000"));
