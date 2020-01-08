const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

/* GET home page. */
router.get('/', auth.ensureAuthenticated, function(req, res, next) {
    res.render('pages/index', { 
      title: 'Trang chủ',
      user: req.user
    });
  });
  
  /* GET home page. */
  router.get('/index.html', auth.ensureAuthenticated, function(req, res, next) {
    res.render('pages/index', { 
      title: 'Trang chủ',
      user: req.user }
      );
  });


module.exports = router;