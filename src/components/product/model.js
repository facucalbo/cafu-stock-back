const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    type: String,
    brand: String,
    model: String,
    pack: Number,
    stock: Number,
    price: Number,
    dateAdded: Date,
});

const model = mongoose.model('Product', mySchema);

module.exports = model;