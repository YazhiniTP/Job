// add dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser= require('body-parser');
const passport = require('passport');
const config = require('./config/database');

//10 connect to mongoDB -> config/database
//mongoose.connect(config.database);
mongoose.connect(config.database, { useNewUrlParser: true });

// on connection
mongoose.connection.on('connected', () => {
    console.log('Conncted to database '+config.database);
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

//1 initialising app variable
const app = express();

//7 separte file for users route
const users = require('./routes/users');

//2 port number
const port = 3000;

//5 https://www.npmjs.com/package/cors
app.use(cors());

//9 set static folder to public (folder name)
app.use(express.static(path.join(__dirname, 'public')));

//6 Body parser middleware
// parse incoming request
app.use(bodyParser.json());

//11 passport middleware
app.use(passport.initialize());
app.use(passport.session());

//12 after configuring passport.js file
//12 after configuring passport.js file
require('./config/passport')(passport);

//8 use user routes
app.use('/users', users);

//4 cannot get / -> cause no route to home page, add route
app.get('/', (req, res) => {
    res.send("Invalid endpoint");
});

app.post('/', (req, res) => {
    res.send('POST request to the homepage')
});

//3 app list to specified port, callback with arrow function
// start server
app.listen(port, () => {
    console.log('Server started on port '+port);
});