const express = require( 'express' );
const cors = require('cors');
const bodyParser = require( 'body-parser' );
const db = require('./db');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');

db('mongodb+srv://facundo:facundoPassword123@first-cluster.fhxif.mongodb.net/cafuStock?retryWrites=true&w=majority');

const router = require('./network/routes');

const app = express();

app.use( bodyParser.json() );

const whitelist = ['http://localhost:3000'];
const options = {
    origin: ( origin, cb ) => {
        if( whitelist.includes(origin)) {
            cb(null, true);
            return
        } 
        cb(new Error('No permission')); 
    }
};

app.use(cors(/* options */));

// app.use( router );
router(app);
app.use( logErrors );
app.use( boomErrorHandler );
app.use( errorHandler );



app.use( '/app', express.static('public'));

app.listen(3000);