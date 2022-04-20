const store = require('./store');
const boom = require('@hapi/boom');
const auth = require('../../auth');

function addSale(user, products, client) {
    if(!products || !client) throw boom.badRequest('Product and client')
    return store.addNew(user._id, products, client);
}

module.exports = {
    addSale
}