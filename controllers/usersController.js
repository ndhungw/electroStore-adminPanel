var userModel = require('../models/userModel');
const bcrypt = require('bcryptjs')
//import logger from '../core/logger/app-logger'

const controller = {};

controller.registerNewUser = async (req, res) => {
    //console.log('Thong tin dang ky:', req.body.name, req.body.email, req.body.password, req.body.password2, req.body.avatarURL);

    let { name, email, password, password2, avatarURL } = req.body;

    let errors = [];

    //check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all fields' });
    }

    //check password match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    if (errors.length > 0) {
        console.log("have issues in register info");
        res.render('pages/users/register', { errors, name, email, password, password2, avatarURL });
    } else {
        const existUser = await userModel.findOne({ email: email })

        if (existUser) {
            //user exists
            errors.push({ msg: 'Email is already registered' });
            res.render('pages/users/register', { errors, name, email, password, password2, avatarURL });
        } else {
            if (avatarURL == '') {
                avatarURL = "https://image.flaticon.com/icons/svg/64/64096.svg"
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
                avatarURL: avatarURL
            });
            try {
                await newUser.save();
                console.log('new user\n' + newUser);

                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
            } catch (err) {
                console.log('Error in newUser.save() + ', err);
            }
        }
    }
}

// /**
//  * Display All Users page(R)
//  */
// controller.getAll = async (req, res) => {
//     try {
//         // const users = await userModel.getAll();
//         // //countDocument(users)
//         console.log('sending all users...');
//         res.render('pages/members/tables',{
//             paginatedResult: res.paginatedResults,
//             users: res.paginatedResults.users,
//             previousPage: res.paginatedResults.previous,
//             currentPage: res.paginatedResults.current,
//             nextPage: res.paginatedResults.next,
//             totalPage: res.paginatedResults.totalPage,
//           })
//     }
//     catch (err) {
//         console.log('Error in getting users- ' + err);
//         res.send('Got error in getAll');
//     }
// }

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

// /**
//  * Display the Add User page
//  */
// controller.displayAddUserPage = (req,res) => {
//     try {
//         console.log('loading Add User page . . .');
//         res.render('pages/members/add');
//     }
//     catch (err) {
//         console.log('Error in loading Add User page- ' + err);
//         res.send('Got error in loading Add User page');
//     }
// }

/**
 * Display the Update User page
 */
controller.displayUpdateUserPage = async (req, res) => {
    let userID = req.params.id;

    try {
        const user = await userModel.getUser(userID);
        console.log('loading Update User page . . .');
        res.render('pages/users/update', { user: user });
    }
    catch (err) {
        console.log('Error in loading Update User page- ' + err);
        res.send('Got error in loading Update User page');
    }
}

// /**
//  * Add User (C)
//  */
// controller.addUser = async (req, res) => {
//     let userToAdd = userModel({
//         username: req.body.userName,
//         fullname: req.body.userFullName,
//         gender: req.body.userGender,
//         age: req.body.userAge
//     });

//     try {
//         const savedUser = await userModel.addUser(userToAdd);
//         console.log('Adding user . . .');
//         res.redirect('/members/add');
//         //res.send('added: ' + savedUser);
//     }
//     catch(err) {
//         console.log('Error in getting users- ' + err);
//         res.send('Got error in addUser');
//     }
// }

/**
 * Display Profile (U)
 */
controller.displayProfile = (req,res) => {
    res.render('pages/users/profile', {
        user: req.user
    });
}
/**
 * Update user (U)
 */
controller.updateUser = async (req, res) => {
    //user id of the user to update
    let userID = req.body.userID;

    const {userName, userPassword, userNewPassword } = req.body;
    let errors = [];

    //check required fields
    if (!userName || !userPassword || !userNewPassword) {
        errors.push({ msg: 'Please fill all fields !!!!!' });
    }

    //check password match
    if (userPassword !== userNewPassword) {
        errors.push({ msg: 'New password is same old password' });
    }

    //check pass length
    if (userNewPassword.length < 6) {
        errors.push({ msg: 'New password should be at least 6 characters' })
    }

    if (errors.length > 0) {
        console.log("have issues in update user info");
        res.render('pages/users/profile', { errors });
    } else {

    //Check if match Password
    const userToUpdate = await userModel.findById(userID);
    let isMatch = await bcrypt.compare(req.body.userPassword, userToUpdate.password);
    
    if (!isMatch) {
        console.log('password not match');
        // req.flash('success_msg', 'password not match');
        return;
    }

    let userDataToUpdate = userModel({
        email: req.body.userEmail,
        name: req.body.userName,
        password: req.body.userNewPassword,
    });

    try {
        const updatedUser = await userModel.updateUser(userID, userDataToUpdate)
        console.log('Updating user . . .');
        res.redirect('/');
        //res.send('updated: ' + updatedUser);
    }
    catch (err) {
        console.log('Error in updating user- ' + err);
        res.send('Got error in updateUser');
    }
}
}

// /**
//  * Delete user (D)
//  */
// controller.deleteUser = async (req, res) => {
//     let userID = req.params.id;
//     console.log('controller.deleteUser: userID = ' + userID);

//     try{
//         const removedUser = await userModel.removeUser(userID);
//         console.log('Deleted User- ' + removedUser);
//         res.send(removedUser);
//         //res.send('User successfully deleted');
//     }
//     catch(err) {
//         console.log('Failed to delete user- ' + err);
//         //res.send('Delete failed..!');
//     }
// }


//export default controller;
module.exports = controller; 