const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

// Register - post
router.post('/register', (req, res, next) => {
    //res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err) {
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    });
});

// Authenticate - post
router.post('/authenticate', (req, res, next) => {
    //res.send('AUTHENTICATE');
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        //if(err) throw err;
        if(!user) {
            return res.json({success: false, msg:'User not found'});
        } 

        //write comparePassword function in user model
        User.comparePassword(password, user.password, (err, isMatch) => {
            //if(err) throw err;

            if(isMatch) {
                //create token
                //user = JSON.parse(JSON.stringify(user));
                //user =  {data:user};
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg:'Wrong password'});
            }
        });
    });
});

// Profile
// after authenticate - add parameter to store user data
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    //res.send('PROFILE');
    res.json({user: req.user});
});

module.exports = router;