// importing all the required modules
const express = require('express');
const sql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;


// initializing the database and connecting it 
const db = sql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD, // Ensure correct case for 'password'
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL connected...');
  }
});


//configuring all the middlewares
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/pages'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
