const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullname: { 
        type: String, 
        required: true
    },
    gender: { 
        type: String, 
        required: true 
    },
    age: { type: Number, 
        required: true,//nếu kĩ phải thêm validator. (validate.isNumeric??)
    },
});

let UsersModel = mongoose.model('User', UserSchema, 'users');

//hàm tự phân trang
UsersModel.paginatedResults = () => {
    return async (req, res, next) => {
        //kiểm tra điều kiện
        if (req.query.page < 1) {
            req.query.page = 1;
        }
        if (req.query.limit < 5) {
            req.query.limit = 5;
        }

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const PaginatedResult = {};//lưu kết quả

        PaginatedResult.totalPage = 6;

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

/**
 * Get all the users
 */
UsersModel.getAll = () => {
    console.log('UsersModel.getAll');
    var query = UsersModel.find({});
    return query;//nếu query.exec() thì var promise=query.exec();
}

/**
 * Get an user with <userID>
 */
UsersModel.getUser = (userID) => {
    console.log('UserModel.getUser');
    var query = UsersModel.findById(userID);
    return query;
}

/**
 * Add a new user
 */
UsersModel.addUser = (userToAdd) => {
    console.log('UsersModel.addUser');
    return userToAdd.save();
}

/**
 * Update user
 */
UsersModel.updateUser = (userID,userDataToUpdate) => {
    console.log('UserModel.updateUser');
    var query = UsersModel.findByIdAndUpdate(
        {
            _id: userID
        },
        {
            $set: {
                username: userDataToUpdate.username,
                fullname: userDataToUpdate.fullname,
                gender: userDataToUpdate.gender,
                age: userDataToUpdate.age
            }
        },
        {
            useFindAndModify: false
        }
    )
    return query;
}

/**
 * Remove an user
 */
UsersModel.removeUser = (userID) => {
    console.log('UsersModel.removeUser(' + userID + ')');
    return UsersModel.deleteOne({ _id: userID });
}

/**
 * Export this model
 */
//                              name    schema      collection
//module.exports = mongoose.model('User',userSchema,'users');
module.exports = UsersModel;