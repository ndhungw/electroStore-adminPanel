var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('pages/users/login', { title: 'Đăng nhập' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('pages/users/register', { title: 'Đăng kí' });
});

module.exports = router;