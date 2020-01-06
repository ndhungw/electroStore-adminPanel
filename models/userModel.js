const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarURL: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: 0
    }
});

let UserModel = mongoose.model('User', UserSchema, 'administrators');

/**
 * Get an user with <userID>
 */
UserModel.getUser = (userID) => {
    console.log('UserModel.getUser');
    var query = UserModel.findById(userID);
    return query;
}


/**
 * Update user
 */
UserModel.updateUser = async (userID,userDataToUpdate) => {
    console.log('UserModel.updateUser');

    //hash password
    const hashedPassword = await bcrypt.hash(userDataToUpdate.password, 10); 

    var query = UserModel.findByIdAndUpdate(
        {
            _id: userID
        },
        {
            $set: {
                name: userDataToUpdate.name,
                password: hashedPassword
            }
        },
        {
            useFindAndModify: false
        }
    )
    return query;
}


UserModel.setActiveStatus = async (userID) => {
    var query = await UserModel.findByIdAndUpdate(
        {
            _id: userID
        },
        {
            $set: { isActive: 1 }
        },
        {
            useFindAndModify: false
        }
    )
    return query;
}

/**
 * Export this model
 */
//                              name    schema      collection
//module.exports = mongoose.model('User',userSchema,'users');
module.exports = UserModel; 