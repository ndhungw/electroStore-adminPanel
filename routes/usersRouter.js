var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var userController = require('../controllers/usersController');
var database = require('../database');

/* GET users listing. */

router.get('/', userModel.paginatedResults(), (req, res, next) => {
  //test by json
  // res.json(res.paginatedResults);

  /*test*/
  // var currentPage = res.paginatedResults.current;
  // console.log('currentPage = '+ currentPage);

  // var nextPage = res.paginatedResults.next;
  // console.log('nextPage = '+ nextPage);

  // var previousPage = res.paginatedResults.previous;
  // console.log('previousPage = '+ previousPage);

  //var users = res.paginatedResults.results;//kết quả trả ra theo query nhận từ req

  // res.render('pages/tables',{
  //   users: res.paginatedResults.results,
  //   currentPage: res.paginatedResults.current,
  //   nextPage: res.paginatedResults.next,
  //   previousPage: res.paginatedResults.previous
  // })

  res.render('pages/tables',{
    paginatedResult: res.paginatedResults,
    users: res.paginatedResults.users,
    previousPage: res.paginatedResults.previous,
    currentPage: res.paginatedResults.current,
    nextPage: res.paginatedResults.next
  })
});

router.get('/allusers', (req, res) => {
  userController.getAll(req, res);
});

module.exports = router;
