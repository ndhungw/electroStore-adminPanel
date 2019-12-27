const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true 
    }
});

let AdminsModel = mongoose.model('Admin', AdminSchema, 'administrators');

/**
 * Add a new user
 */
AdminsModel.addAdmin = (adminToAdd) => {
    console.log('AdminsModel.addAdmin');
    return adminToAdd.save();
}

/**
 * Export this model
 */
module.exports = AdminsModel;