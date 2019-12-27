var adminModel = require('../models/adminModel');

const controller = {};

/**
 * Add User (C)
 */
controller.addAdmin = async (req, res) => {
    let adminToAdd = adminModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await adminModel.addAdmin(adminToAdd);
        console.log('Adding admin account . . .');
        res.redirect('/login');
        //res.send('added: ' + savedUser);
    }
    catch(err) {
        console.log('Error in getting admins- ' + err);
        res.send('Got error in addAdmin');
    }
}

//export default controller;
module.exports = controller;