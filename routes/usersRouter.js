var express = require('express');
var router = express.Router();
//var userModel = require('../models/userModel');
var userController = require('../controllers/usersController');

/* GET users listing. */
/*xài middleware để lấy kết quả currentPage, prevPage, nextPage, làm pagination thủ công không dùng AJAX*/
// router.get('/', userModel.paginatedResults(), (req, res, next) => {
//   //test by json
//   //res.json(res.paginatedResults);

//   /*test*/
//   // var currentPage = res.paginatedResults.current;
//   // console.log('currentPage = '+ currentPage);

//   // var nextPage = res.paginatedResults.next;
//   // console.log('nextPage = '+ nextPage);

//   // var previousPage = res.paginatedResults.previous;
//   // console.log('previousPage = '+ previousPage);

//   //var users = res.paginatedResults.results;//kết quả trả ra theo query nhận từ req

//   res.render('pages/tables',{
//     paginatedResult: res.paginatedResults,
//     users: res.paginatedResults.users,
//     previousPage: res.paginatedResults.previous,
//     currentPage: res.paginatedResults.current,
//     nextPage: res.paginatedResults.next
//   })
// });



/**
 * GET users listing.
 */
// router.get('/', (req, res) => {
//   userController.getAll(req, res);
// });
//domain/user
router.get('/', userController.getAll);

/**
 * Go to Add User page
 */
//  domain/user/add-user
router.get('/add-user', userController.displayAddUserPage);

/**
 * Add new User
 */
router.post('/add-user', userController.addUser);

/**
 * Go to Update User page
 */
//  domain/user/update/ef09qj2409fjsda09  
router.get('/update/:id')

/**
 * Update User
 */
router.post('/update/:id')

/**
 * Go to Remove User page
 */
//  domain/user/edit/ef09qj2409fjsda09  
router.get('/edit/:id')



module.exports = router;
