var express = require('express');
var router = express.Router();
var userController = require('../controllers/membersController');
var userModel = require('../models/memberModel');

/* GET users listing. */
/*xài middleware để lấy kết quả currentPage, prevPage, nextPage, làm pagination thủ công không dùng AJAX*/
router.get('/', userModel.paginatedResults(), userController.getAll);

/**
 * Go to Add User page
 * members/add-user
 */
router.get('/add', userController.displayAddUserPage);

/**
 * Add new User
 * /members/add-user
 */
router.post('/add', userController.addUser);

/**
 * Go to Update User page
 * /members/update/ef09qj2409fjsda09  
 */
router.get('/update/:id', userController.displayUpdateUserPage);

/**
 * Update User
 * /members/update/ef09qj2409fjsda09
 */
router.post('/update/:id', userController.updateUser);

/**
 * Remove User
 * /members/update/ef09qj2409fjsda09
 */
router.delete('/update/:id', userController.deleteUser);

module.exports = router;
