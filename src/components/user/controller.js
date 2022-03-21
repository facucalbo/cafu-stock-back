const store = require('./store');
const boom = require('@hapi/boom');

function addUser(name) {
    if ( !name ) {
        throw boom.badRequest('Param name is required');
    }
    const user = { name };
    return store.add( user );
}

function getUser() {
    return store.get();
}

module.exports = {
    addUser,
    getUser,
}