const express = require('express');
const response = require ( '../../network/response' );
const controller = require('./controller')
const router = express.Router();

router.get('/', ( req, res, next ) => {
    const filterUser = req.query.user || null;
    
    controller.getMessages(filterUser)
        .then(( messageList ) => {
            response.success(req, res, messageList, 200)
        })
        .catch( err => {
            // next( err );
            // response.error( err );
            response.error( req, res, 'Unexpected error', 500)
        })
});

router.post( '/', (req, res, next) => {
    controller.addMessage(req.body.user, req.body.message)
        .then( (fullMessage) => {
            // next(fullMessage);
            if( fullMessage.isBoom ){
                response.error( req, res, fullMessage.output.payload.message, fullMessage.output.statusCode, fullMessage.output.payload.error)
                return;
            }
            response.success(req, res, fullMessage , 201);
        })
        .catch( err => {
            response.error( req, res, 'Informacion invalida', 400, err )
        });
});

router.patch( '/:id', (req, res) => {
    console.log(req.params.id);

    res.send('ok')
})

module.exports = router;