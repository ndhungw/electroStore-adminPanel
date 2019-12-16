const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
});

let UsersModel = mongoose.model('User', UserSchema, 'users');


UsersModel.getAll = () => {
    console.log('UsersModel.getAll');
    var query = UsersModel.find({});
    return query;//nếu query.exec() thì var promise=query.exec();
}

UsersModel.paginatedResults = () => {
    return async (req, res, next) => {
        //kiểm tra điều kiện
        if (req.query.page < 1) {
            req.query.page = 1;
        }
        if (req.query.limit < 7) {
            req.query.limit = 7;
        }

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const PaginatedResult = {};//lưu kết quả

        PaginatedResult.current = {
            page: page,
            limit: limit
        }

        if (endIndex < await UsersModel.countDocuments().exec()) {
            PaginatedResult.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            PaginatedResult.previous = {
                page: page - 1,
                limit: limit
            };
        }

        try {
            PaginatedResult.users = await UsersModel.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = PaginatedResult;
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