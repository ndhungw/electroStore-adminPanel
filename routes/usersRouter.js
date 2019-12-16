var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var userController = require('../controllers/usersController');
var database = require('../database');

/* GET users listing. */

router.get('/', userModel.paginatedResults(), (req, res, next) => {
  res.json(res.paginatedResults);
});

router.get('/allusers', (req, res) => {
  userController.getAll(req, res);
});

module.exports = router;
