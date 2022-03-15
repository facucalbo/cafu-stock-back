const store = require('./store');

function addMessage(user, message) {
// trabajamos con promesas para validar el body
    return new Promise(( resolve, reject ) => {
        
        if( !user || !message ) {
            console.log('[Message Controller] No hay usuario o mensaje');
            reject('Datos incorrectos');
        }

        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        }

        store.add(fullMessage);

        resolve(fullMessage)
    })
    .catch( (err) => err ) 
}

function getMessages() {
    return new Promise(( resolve, reject ) => {
        resolve(store.list())
    });
}

module.exports = {
    addMessage,
    getMessages,
}