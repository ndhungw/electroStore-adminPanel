const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');

const {ensureAuthenticated} = require('../config/auth');

// Model
const userModel = require('../models/userModel');

// Controller
const usersController = require('../controllers/usersController');

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('pages/users/login', { title: 'Đăng nhập' });
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('pages/users/register', { title: 'Đăng kí' });
});

/* POST register page. */
router.post('/register', usersController.registerNewUser);

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

//get
router.get('/profile', ensureAuthenticated, usersController.displayProfile);

//post
router.post('/profile', ensureAuthenticated, usersController.editUser);


// router.get('/update/:id', ensureAuthenticated, usersController.displayUpdateUserPage);

// router.post('/update/:id', ensureAuthenticated, usersController.updateUser);

// VERIFICATION EMAIL
router.get('/email-verification', usersController.activateUser);

module.exports = router; 