const mongoose = require('mongoose');

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
});

let UserModel = mongoose.model('User', UserSchema, 'administrators');

/**
 * Export this model
 */
//                              name    schema      collection
//module.exports = mongoose.model('User',userSchema,'users');
module.exports = UserModel;