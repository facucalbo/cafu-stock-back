const store = require('./store');
const boom = require('@hapi/boom');
const auth = require('../auth/controller');

async function addUser( userData ) {
    if ( !userData ) {
        throw boom.badRequest('User data required');
    }

    const response = await store.add( userData );
    const userId = userData.id || response._id || '';

    await auth.upsert({
        id: userId,
        username: userData.username,
        password: userData.password,
    });
    // TODO: contemplar que hacer en caso de que no se genere el documento auth
    return response;
}

function updateUser( userData, _id ) {
    if ( !userData ) {
        throw boom.badRequest('User data required');
    }

    if(userData.password) {}

    return store.update( userData );

}

function getUser() {
    return store.get();
}

module.exports = {
    addUser,
    getUser,
    updateUser,
}