const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const UserModel = require('../models/userModel');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            //Match User
            const user = await UserModel.findOne({ email: email })

            if (!user) {
                return done(null, false, { message: 'That email is not registered' });
            }

            try {
                let isMatch = await bcrypt.compare(password, user.password);

                if (isMatch){
                    return done(null, user);
                }
                else{
                    return done(null, false, {message: 'Password is incorrect'});
                }
            } catch (err) {
                console.log('Error in bcrypt.compare(password, user.password) - ' + err);
            }
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
          done(err, user);
        });
      });
}