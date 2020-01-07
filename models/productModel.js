var mongoose = require('mongoose');//import mongoose
var Schema = mongoose.Schema;//use the mongoose schema object

//create a new schema
var productSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    imgURL: { type: String, required: true },
    imgURL2: { type: String, required: true },
    imgURL3: { type: String, required: true },
});

let ProductsModel = mongoose.model('Product', productSchema, 'products');

module.exports = ProductsModel;

