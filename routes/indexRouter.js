const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('pages/index', { 
      title: 'Express',
      user: req.user
    });
  });
  
  /* GET home page. */
  router.get('/index.html', ensureAuthenticated, function(req, res, next) {
    res.render('pages/index', { title: 'Express' });
  });


module.exports = router;