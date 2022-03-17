const express = require('express');
const response = require ( '../../network/response' );
const controller = require('./controller')
const router = express.Router();

router.get('/', (req, res) => {
    controller.getChat()
        .then( data => {
            response.success( req, res, data, 201 );
        })
        .catch( err => {
            response.error( req, res, 'Internal error', 500, err);
        });
});

router.post('/', (req, res) => {
    controller.addChat( req.body.users )
        .then( data => {
            response.success( req, res, data, 201 );
        }) 
        .catch( err => {
            response.error( req, res, 'Internal error', 500, err );
        });
});

module.exports = router;