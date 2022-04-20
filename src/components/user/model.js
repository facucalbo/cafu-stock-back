const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    username: String,
    email: String,
    unrealizedSales: [{
        products: [{
            type: Schema.ObjectId,
            ref: 'Product',
        }],
        client: {
            type: Schema.ObjectId,
            ref: 'Client'
        }
    }],
    clients: [{
        type: Schema.ObjectId, // poner un id personalizado?
        ref: 'Client',
    }]
    // Probablemente tengas que crear un subschema para el arrayy de clientes
});

const model = mongoose.model('User', mySchema);
module.exports = model;