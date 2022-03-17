const db = require( 'mongoose' );

db.Promise = global.Promise;

// mongodb+srv://facundo:3R7xE2guYv5mGYE@first-cluster.fhxif.mongodb.net/cafuStockDB?retryWrites=true&w=majority

async function connect(uri) {    
    await db.connect( uri );
    console.log('[db] Conectada con exito');
}

module.exports = connect;