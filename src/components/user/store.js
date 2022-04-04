const Model = require('./model');

function addUser( user ) {
    const myUser = new Model( user );

    return myUser.save();
}

function getUser() {
    return Model.find();
}

async function query(q) {
    const response = await Model.find({username: q.username});
    if(response.length === 1) {
        return response[0];
    }
    return {error: true}
}

module.exports = {
    add: addUser,
    get: getUser,
    query,
}