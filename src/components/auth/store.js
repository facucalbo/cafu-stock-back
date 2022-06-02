const {model, tokenModel} = require('./model');

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

function addAccessToken ( accessToken, uid ) {
    const data = {
        uid: uid, 
        accessToken: accessToken
    };

    const myToken = new tokenModel( data );

    return myToken.save();
}

function accessTokenIsValid( accessToken ) {
    const response = tokenModel.find({accessToken: accessToken})
    console.log(response);
}

module.exports = {
    add: addNewUser,
    update: updateUser,
    get: getAuth,
    addToken: addAccessToken,
    tokenIsValid: accessTokenIsValid
}