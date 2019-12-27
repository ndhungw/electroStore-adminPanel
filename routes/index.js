var express = require('express');
var router = express.Router();





// test login for admin
var passport = require('passport')//--------------------
const bcrypt = require('bcrypt');

//const users = [];

var initializePassport = require('../controllers/passport-config');
var admins = require('../models/adminModel');
initializePassport(
  passport, 
  email => admins.find(user => user.email === email),
  id => admins.find(user => user.id === id)
);

/* GET home page. */
router.get('/', checkAuthenticated, function(req, res, next) {
  res.render('pages/index', { title: 'Express', name: req.user.name });
});

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});
router.get('/login',  checkNotAuthenticated, (req, res) => {
  res.render('pages/login');
});

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('pages/register');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'login',
  failureFlash: true
}));

// router.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     //const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.push({
//       // id: Date.now().toString(),
//       name: req.body.name,//userFullName
//       email: req.body.email,//userEmail
//       password: hashedPassword
//     })
//     res.redirect('/login')
//   } catch (e) {
//     console.log('error : ' + e);
//     res.redirect('/register')
//   }
//   console.log(users);
// });

var loginController = require('../controllers/loginController');
router.post('/register', checkNotAuthenticated, loginController.addAdmin);

router.delete('/logout', (req,res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  next();
}

//end test


module.exports = router;
