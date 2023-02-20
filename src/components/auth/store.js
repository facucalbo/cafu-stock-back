const {model, authenticatedUserModel } = require('./model');

function addNewUser( data ) {
    const myAuth = new model( data );

    return myAuth.save();
    // agrego el nuevo usuario junto al password
}

function updateUser() {

    // TODO
    // busco el id del usuario que me pasaron y hago los cambios
}

async function getAuth( userId ){
    const response = await model.find({user: userId});
    if(response.length === 1) {
        return response[0];
    }
    return {error: true}
}

function addAuthenticatedUser( uid ) {
    const data = {
        uid: uid,
    };
    const myAuthenticatedUser = new authenticatedUserModel( data );
    return myAuthenticatedUser.save();
}

async function userIsAuthenticated( uid ) {
    const response = await authenticatedUserModel.findOne({uid: uid})
    deleteUserAuthentication(uid);
    return response;
}

async function deleteUserAuthentication(uid) {
    await authenticatedUserModel.deleteMany({'uid': uid});
}

module.exports = {
    add: addNewUser,
    update: updateUser,
    get: getAuth,
    authenticateUser: addAuthenticatedUser,
    userIsAuthenticated,
}