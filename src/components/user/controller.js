const store = require('./store');
const boom = require('@hapi/boom');
const auth = require('../auth/controller');

async function addUser( userData ) {
    if ( !userData ) {
        throw boom.badRequest('User data required');
    }

    const userExist = await store.findUser( userData.username );

    if(userExist.length > 0) {
        return {alredyExist: true}
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

// function getProducts() {
//     db.users.aggregate([{$lookup: {from: "products", localField: "_id", foreignField: "owner", as: "products_docs"}}])
// }

module.exports = {
    addUser,
    getUser,
    updateUser,
}