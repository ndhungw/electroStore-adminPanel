var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var database = require('../database');

/* GET users listing. */

  router.get('/', paginatedResults(userModel), (req, res, next) => {
    res.json(res.paginatedResults);
  });
  
  function paginatedResults(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const resultsss = {};
      
      resultsss.current = {
        page: page,
        limit: limit
      }
      
      if (endIndex < await model.countDocuments().exec()) {
        resultsss.next = {
          page: page + 1,
          limit: limit
        };
      }
      
      if (startIndex > 0) {
        resultsss.previous = {
          page: page - 1,
          limit: limit
        };
      }
      
      try{
        resultsss.results = await model.find().limit(limit).skip(startIndex).exec();
        res.paginatedResults = resultsss;
        next();
      }catch (e) {
        res.status(500).json({message: e.message});
      }
    }
  }
  
  module.exports = router;
  