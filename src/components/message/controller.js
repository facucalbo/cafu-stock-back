const store = require('./store');
const boom = require('@hapi/boom');

function addMessage( user, message ) {
// trabajamos con promesas para validar el body
    return new Promise(( resolve, reject, error ) => {
        
        if( !user || !message ) {
            console.log('[Message Controller] No hay usuario o mensaje');
            reject(boom.notFound('datos incorrectos'));
            // throw boom.notFound( 'Product not found' );
            return false;
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

function getMessages(filterUser) {
    // const user = this.getFAfafa();
    return new Promise(( resolve, reject ) => {
        resolve(store.list(filterUser))
    });
}

module.exports = {
    addMessage,
    getMessages,
}