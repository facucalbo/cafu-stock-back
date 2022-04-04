const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    password: String,
})

const model = mongoose.model('Auth', mySchema);

module.exports = model;