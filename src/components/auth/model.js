const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    password: String,
})

const authenticatedUserSchema = new Schema({
    uid: {
        type: String
    }
})

const model = mongoose.model('Auth', mySchema);
const authenticatedUserModel = mongoose.model('Tokens', authenticatedUserSchema);

module.exports = {
    model,
    authenticatedUserModel
};