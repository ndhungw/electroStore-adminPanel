const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
});

let UsersModel = mongoose.model('User', UserSchema, 'users');


UsersModel.getAll = () => {
    console.log('UsersModel.getAll');
    return UsersModel.find({});
}

UsersModel.paginatedResults = () => {
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

        if (endIndex < await UsersModel.countDocuments().exec()) {
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

        try {
            resultsss.results = await UsersModel.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = resultsss;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}



// function paginatedResults(model) {
//     return async (req, res, next) => {
//       const page = parseInt(req.query.page);
//       const limit = parseInt(req.query.limit);
      
//       const startIndex = (page - 1) * limit;
//       const endIndex = page * limit;
      
//       const resultsss = {};
      
//       resultsss.current = {
//         page: page,
//         limit: limit
//       }
      
//       if (endIndex < await model.countDocuments().exec()) {
//         resultsss.next = {
//           page: page + 1,
//           limit: limit
//         };
//       }
      
//       if (startIndex > 0) {
//         resultsss.previous = {
//           page: page - 1,
//           limit: limit
//         };
//       }
      
//       try{
//         resultsss.results = await model.find().limit(limit).skip(startIndex).exec();
//         res.paginatedResults = resultsss;
//         next();
//       }catch (e) {
//         res.status(500).json({message: e.message});
//       }
//     }
//   }

//                              name    schema      collection
//module.exports = mongoose.model('User',userSchema,'users');
module.exports = UsersModel;