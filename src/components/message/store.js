const Model = require( './model' );

function addMessage( message ) {
    // list.push(message);
    console.log(message);
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage(filterUser) {
    return new Promise( (resolve, reject ) => {
        let filter = {}
    
        if ( filterUser ) {
            filter = { user: filterUser };
        }
    
        Model.find( filter )
            .populate('user')
            .exec( ( error, populated ) => {
                if( error ) return reject(error);

                resolve(populated);
            });
    })
}

module.exports = {
    add: addMessage,
    list: getMessage,
    // get
    // update
    // delete
}