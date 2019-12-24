var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');
var userModel = require('../models/userModel')
/* GET users listing. */
/*xài middleware để lấy kết quả currentPage, prevPage, nextPage, làm pagination thủ công không dùng AJAX*/
router.get('/', userModel.paginatedResults(), (req, res, next) => {
  //test by json
  //res.json(res.paginatedResults);

  /*test*/
  // var currentPage = res.paginatedResults.current;
  // console.log('currentPage = '+ currentPage);

  // var nextPage = res.paginatedResults.next;
  // console.log('nextPage = '+ nextPage);

  // var previousPage = res.paginatedResults.previous;
  // console.log('previousPage = '+ previousPage);

  //var users = res.paginatedResults.results;//kết quả trả ra theo query nhận từ req

  res.render('pages/users/tables',{
    paginatedResult: res.paginatedResults,
    users: res.paginatedResults.users,
    totalPage: res.paginatedResults.totalPage,
    previousPage: res.paginatedResults.previous,
    currentPage: res.paginatedResults.current,
    nextPage: res.paginatedResults.next
  })
});



/**
 * GET users listing.
 * /users
 */
//router.get('/', userController.getAll);

/**
 * Go to Add User page
 * users/add-user
 */
router.get('/add', userController.displayAddUserPage);

/**
 * Add new User
 * /users/add-user
 */
router.post('/add', userController.addUser);

/**
 * Go to Update User page
 * /users/update/ef09qj2409fjsda09  
 */
router.get('/update/:id', userController.displayUpdateUserPage);

/**
 * Update User
 * /users/update/ef09qj2409fjsda09
 */
router.post('/update/:id', userController.updateUser);

/**
 * Remove User
 * /users/update/ef09qj2409fjsda09
 */
router.delete('/update/:id', userController.deleteUser);

module.exports = router;
