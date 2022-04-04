const Model = require('./model');

function addNewUser( data ) {
    const myAuth = new Model( data );

    return myAuth.save();
    // agrego el nuevo usuario junto al password
}

function updateUser() {

    // TODO
    // busco el id del usuario que me pasaron y hago los cambios
}

async function getAuth( userId ){
    const response = await Model.find({user: userId});
    if(response.length === 1) {
        return response[0];
    }
    return {error: true}
}

module.exports = {
    add: addNewUser,
    update: updateUser,
    get: getAuth
}