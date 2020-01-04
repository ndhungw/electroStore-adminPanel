const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const UserModel = require('../models/userModel');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            UserModel.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }

                    //Match Password
                        //user comes from database, user.password below is hashed before
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        }
                        else{ 
                            return done(null, false, {message: 'Password incorrect'});
                        }
                    });
                })
                .catch(err => console.log(err))

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