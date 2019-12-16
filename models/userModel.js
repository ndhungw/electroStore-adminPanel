const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
});

//                              name    schema      collection
module.exports = mongoose.model('User',userSchema,'users');