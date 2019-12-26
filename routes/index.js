var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});


// test login for admin
const users = [];
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/register', (req, res) => {
  res.render('pages/register');
});

router.post('/login', (req, res) => {

});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
    users.push({
      //id: Date.now().toString()
      name: req.body.userFullName,
      email: req.body.userEmail,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users);
});


//end test


module.exports = router;
