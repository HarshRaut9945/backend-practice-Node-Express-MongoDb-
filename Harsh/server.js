const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
const passport = require('./auth');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send("Welcome to Learn Node with Harsh");
});

const personRoutes = require('./routes/personRoutes');
const menuItem = require('./routes/menuItemsRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItem);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
