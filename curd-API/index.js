
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoutes=require('./routes/students.routes');
const connectDB=require('./config/database');
const { MulterError } = require('multer');

connectDB()

const PORT=process.env.PORT

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/students',studentRoutes)  // midleware for routes

app.use((error, req, res, next) => {
    if (error instanceof MulterError) {
        return res.status(400).send(`Image Error : ${error.message} : ${error.code}`);
    } else if(error){
        return res.status(500).send(`Something went wrong ${error.message}`)
    }
     next()
});


app.listen(PORT,()=>{
    console.log(`Server running pn port ${PORT}`)
})