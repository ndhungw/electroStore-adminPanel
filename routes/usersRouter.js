const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');

const userModel = require('../models/userModel');

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('pages/users/login', { title: 'Đăng nhập' });
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('pages/users/register', { title: 'Đăng kí' });
});

/* POST register page. */
router.post('/register', function (req, res, next) {
  console.log(req.body);
  // res.send("yeah");

  const { name, email, password, password2 } = req.body;

  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill all fields' });
  }

  //check password match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
  }

  if (errors.length > 0) {
    console.log("have issues");
    res.render('pages/users/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    userModel.findOne({ email: email })
      .then(user => {
        if (user) {
          //user exists
          errors.push({ msg: 'Email is already registered' });
          res.render('pages/users/register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new userModel({
            name,
            email,
            password
          });
          console.log('new user\n' + newUser);
          //res.send("register successfully");

          //Hash password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hashed
            newUser.password = hash;
            //Save user
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          }));


        }

      })
      .catch(exception => {
        console.log("error : " + exception);
      })
  }
});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
})

// Logout handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
})
module.exports = router;