const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    brand: String,
    model: String,
    pack: Number,
    stock: Number,
});

const model = mongoose.model('Product', mySchema);

module.exports = model;