const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({ // Agregar id personalizado? para ponerlo en las ventas realizadas, esto para facilitar la busqueda.
    type: String,
    brand: String,
    model: String,
    package: Number,
    stock: Number,
    price: Number,
    dateAdded: Date,
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

const model = mongoose.model('Product', mySchema);

module.exports = model;