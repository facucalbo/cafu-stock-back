const store = require('./store');

function addChat( users ) {

    if( !users ) {
        return new Promise.reject('Invalid users');
    }

    const chat = { users: users };
    return store.add( chat );
}

function getChat() {
    return store.get();
}


module.exports = {
    addChat,
    getChat,
}