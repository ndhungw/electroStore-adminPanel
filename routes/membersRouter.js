var express = require('express');
var router = express.Router();
var userController = require('../controllers/membersController');
var userModel = require('../models/memberModel');
const {ensureAuthenticated} = require('../config/auth');

/* GET users listing. */
/*xài middleware để lấy kết quả currentPage, prevPage, nextPage, làm pagination thủ công không dùng AJAX*/
router.get('/', ensureAuthenticated, userModel.paginatedResults(), userController.getAll);

/**
 * Go to Add Member page
 * members/add-user
 */
router.get('/add', ensureAuthenticated, userController.displayAddMemberPage);

/**
 * Add new Member
 * /members/add-user
 */
// router.post('/add', ensureAuthenticated, userController.addMember);

/**
 * Go to Update Member page
 * /members/update/ef09qj2409fjsda09  
 */
router.get('/update/:id', ensureAuthenticated, userController.displayUpdateMemberPage);

/**
 * Update Member
 * /members/update/ef09qj2409fjsda09
 */
// router.post('/update/:id', ensureAuthenticated, userController.updateMember);

/**
 * Remove Member
 * /members/update/ef09qj2409fjsda09
 */
router.delete('/update/:id', ensureAuthenticated, userController.deleteMember);

module.exports = router;
