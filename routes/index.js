var express = require('express');
var router = express.Router();





// test login for admin
var passport = require('passport')//--------------------
const bcrypt = require('bcrypt');
const users = [];

var initializePassport = require('../controllers/passport-config');
initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});
router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/register', (req, res) => {
  res.render('pages/register');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'login',
  failureFlash: true
}));

router.post('/register', async (req, res) => {
  try {
    //const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,//userFullName
      email: req.body.email,//userEmail
      password: hashedPassword
    })
    res.redirect('/login')
  } catch (e) {
    console.log('error : ' + e);
    res.redirect('/register')
  }
  console.log(users);
});


//end test


module.exports = router;
