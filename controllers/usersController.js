var userModel = require('../models/userModel');
//import logger from '../core/logger/app-logger'

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        console.log('sending all users...');
        res.render('pages/tables',{users: users})
    }
    catch(err) {
        console.log('Error in getting users- ' + err);
        res.send('Got error in getAll');
    }
}

controller.addCar = async (req, res) => {
    let carToAdd = Car({
        name: req.body.name
    });
    try {
        const savedCar = await Car.addCar(carToAdd);
        logger.info('Adding car...');
        res.send('added: ' + savedCar);
    }
    catch(err) {
        logger.error('Error in getting cars- ' + err);
        res.send('Got error in getAll');
    }
}

controller.deleteCar = async (req, res) => {
    let carName = req.body.name;
    try{
        const removedCar = await Car.removeCar(carName);
        logger.info('Deleted Car- ' + removedCar);
        res.send('Car successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete car- ' + err);
        res.send('Delete failed..!');
    }
}

//export default controller;
module.exports = controller;