const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const db = require('./db');

db('mongodb+srv://facundo:facundoPassword123@first-cluster.fhxif.mongodb.net/cafuStock?retryWrites=true&w=majority');

// const router = require('./components/message/network');
const router = require('./network/routes');

const app = express();
app.use( bodyParser.json() );

// app.use( router );
router(app);


app.use( '/app', express.static('public'));

app.listen(3000);