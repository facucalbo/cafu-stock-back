const express = require('express');
const response = require ( '../../network/response' );
const controller = require('./controller')
const router = express.Router();

router.post('/', (req, res) => {
    controller.addUser( req.body )
        .then( data => {
            response.success( req, res, data, 201 );
        })
        .catch( err => {
            console.log(err);
            response.error( req, res, 'Internal error', 500 );
        })
});

router.get('/', ( req, res ) => {
    controller.getUser()
        .then( data => {
            response.success(req, res, data, 201);
        })
        .catch( err => {
            response.error( req, res, 'Internal error', 500, err )
        })
})

module.exports = router;