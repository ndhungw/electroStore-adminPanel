var userModel = require('../models/memberModel');
//import logger from '../core/logger/app-logger'

const controller = {};

/**
 * Display All Users page(R)
 */
controller.getAll = async (req, res) => {
    try {
        // const users = await userModel.getAll();
        // //countDocument(users)
        console.log('sending all users...');
        res.render('pages/members/tables',{
            paginatedResult: res.paginatedResults,
            users: res.paginatedResults.users,
            previousPage: res.paginatedResults.previous,
            currentPage: res.paginatedResults.current,
            nextPage: res.paginatedResults.next,
            totalPage: res.paginatedResults.totalPage,
          })
    }
    catch (err) {
        console.log('Error in getting users- ' + err);
        res.send('Got error in getAll');
    }
}

// /**
//  * Display All Users page(R)
//  */
// controller.getAll = async (req, res) => {
//     try {
//         const users = await userModel.getAll();
//         //countDocument(users)
//         console.log('sending all users...');
//         res.render('pages/manageUsers/tables',{users: users})
//     }
//     catch (err) {
//         console.log('Error in getting users- ' + err);
//         res.send('Got error in getAll');
//     }
// }

/**
 * Display the Add User page
 */
controller.displayAddUserPage = (req,res) => {
    try {
        console.log('loading Add User page . . .');
        res.render('pages/members/add');
    }
    catch (err) {
        console.log('Error in loading Add User page- ' + err);
        res.send('Got error in loading Add User page');
    }
}

/**
 * Display the Update User page
 */
controller.displayUpdateUserPage = async (req, res) => {
    let userID = req.params.id;

    try {
        const user = await userModel.getUser(userID);
        console.log('loading Update User page . . .');
        res.render('pages/members/update', { user: user });
    }
    catch (err) {
        console.log('Error in loading Update User page- ' + err);
        res.send('Got error in loading Update User page');
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
        res.redirect('/members/add');
        //res.send('added: ' + savedUser);
    }
    catch(err) {
        console.log('Error in getting users- ' + err);
        res.send('Got error in addUser');
    }
}

/**
 * Update user (U)
 */
controller.updateUser = async (req, res) => {
    let userDataToUpdate = userModel({
        username: req.body.userName,
        fullname: req.body.userFullName,
        gender: req.body.userGender,
        age: req.body.userAge
    });

    //user id of the user to update
    let userID = req.body.userID;

    try {
        const updatedUser = await userModel.updateUser(userID, userDataToUpdate)
        console.log('Updating user . . .');
        res.redirect('/members');
        //res.send('updated: ' + updatedUser);
    }
    catch (err) {
        console.log('Error in updating user- ' + err);
        res.send('Got error in updateUser');
    }
}

/**
 * Delete user (D)
 */
controller.deleteUser = async (req, res) => {
    let userID = req.params.id;
    console.log('controller.deleteUser: userID = ' + userID);

    try{
        const removedUser = await userModel.removeUser(userID);
        console.log('Deleted User- ' + removedUser);
        res.send(removedUser);
        //res.send('User successfully deleted');
    }
    catch(err) {
        console.log('Failed to delete user- ' + err);
        //res.send('Delete failed..!');
    }
}


//export default controller;
module.exports = controller;