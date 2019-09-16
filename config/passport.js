const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
    // add keys
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload); 
        console.log("log working");
        User.getUserById(jwt_payload._doc._id, (err, user) => {
        //User.findOne({id: jwt_payload.sub}, function(err, user) {
            if(err) {
                return done(err, false);
            }

            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}