const mongoose = require('mongoose');

//compass
//const mongodb_url = 'mongodb://localhost:27017/electroStoreDB'
//cloud atlas
const mongodb_url = 'mongodb+srv://ndh1379:123456.@cluster0-dqfsn.gcp.mongodb.net/electroStoreDB?retryWrites=true&w=majority'
//const mongodb_url = process.env.MONGODB_URI||process.env.MONGODB_LOCALHOST;//new edit for using .env

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongodb_url, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log("Database connection successfully!");
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }
}

module.exports = new Database();