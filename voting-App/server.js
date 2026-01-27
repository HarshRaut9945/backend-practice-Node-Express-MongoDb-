const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;


// Impoer the router file
const userRoutes=require('./Routes/userRoutes');

app.use('/user',userRoutes)

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

