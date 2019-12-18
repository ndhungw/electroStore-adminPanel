var userModel = require('../models/userModel');
//import logger from '../core/logger/app-logger'

const controller = {};

/**
 * Get all the users (R)
 */
controller.getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        console.log('sending all users...');
        res.render('pages/users/tables',{users: users})
    }
    catch (err) {
        console.log('Error in getting users- ' + err);
        res.send('Got error in getAll');
    }
}

/**
 * Display the Add User page
 */
controller.displayAddUserPage = (req,res) => {
    try {
        console.log('loading Add User page . . .');
        res.render('pages/users/add-user');
    }
    catch (err) {
        console.log('Error in loading Add User page- ' + err);
        res.send('Got error in loading Add User page');
    }
}

/**
 * Add User (C)
 */
controller.addUser = async (req, res) => {
    let userToAdd = userModel({
        username: req.body.userName,
        fullname: req.body.userFullName,
        gender: req.body.userGender,
        age: req.body.userAge
    });

    try {
        const savedUser = await userModel.addUser(userToAdd);
        console.log('Adding user . . .');
        res.redirect('/users/add-user');
        //res.send('added: ' + savedUser);
    }
    catch(err) {
        console.log('Error in getting users- ' + err);
        res.send('Got error in addUser');
    }
}

/**
 * Delete user (D)
 */
controller.deleteUser = async (req, res) => {
    let userName = req.body.name;
    try{
        const removedUser = await userModel.removeUser(userName);
        logger.info('Deleted User- ' + removedUser);
        res.send('User successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete user- ' + err);
        res.send('Delete failed..!');
    }
}

/**
 * Update user
 */
// controller.updateUser = async (req,res) => {
//     let userName = req.body.name;

//     try{
//         //const updatedUser = await userModel.
//     }
//     catch(err){

//     }
// }

//export default controller;
module.exports = controller;