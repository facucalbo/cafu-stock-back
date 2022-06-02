const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    password: String,
})

const tokenSchema = new Schema({
    uid: {
        type: String
    },
    accessToken: String,
})

const model = mongoose.model('Auth', mySchema);
const tokenModel = mongoose.model('Tokens', tokenSchema);

module.exports = {
    model,
    tokenModel
};