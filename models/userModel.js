const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
});

let UsersModel = mongoose.model('User', UserSchema, 'users');

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

UsersModel.getAll = () => {
    console.log('UsersModel.getAll');
    var query = UsersModel.find({});
    return query;//nếu query.exec() thì var promise=query.exec();
}

UsersModel.addUser = (userToAdd) => {
    console.log('UsersModel.addUser');
    return userToAdd.save();
}

UsersModel.removeUser = (userName) => {
    console.log('UsersModel.removeUser');
    return UsersModel.remove({name: userName});
}

/**
 * Export this model
 */
//                              name    schema      collection
//module.exports = mongoose.model('User',userSchema,'users');
module.exports = UsersModel;