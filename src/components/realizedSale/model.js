const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    // id: String,
    type: String,
    brand: String,
    model: String,
    quantity: Number,
    price: Number,
},
{_id: false}
)

const mySchema = new Schema({
    date: Date,
    sellerUser: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    products: [productSchema],
    client: {
        type: String,
        ref: 'Client'
    }
})

const model = mongoose.model('realizedSales', mySchema);

module.exports = model;