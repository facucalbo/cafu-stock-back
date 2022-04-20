const express = require('express');

const secureHandler = require('../../middlewares/secure.handler');
const response = require ( '../../network/response' );
const controller = require('./controller')
const router = express.Router();

router.post('/', (req, res, next) => {
    controller.addUser( req.body )
        .then( data => {
            response.success( req, res, data, 201 );
        })
        .catch( next )
});

router.get('/', secureHandler('logged'), (req, res, next) => {
    controller.getUser()
    .then( data => {
        response.success(req, res, data, 201);
    })
    .catch( next )
})

router.patch('/:_id', secureHandler('update'), (req, res, next) => {
    controller.updateUser( req.body, req.params._id )
        .then( data => {
            response.success( req, res, data, 201 );
        })
        .catch( next )
});

module.exports = router;