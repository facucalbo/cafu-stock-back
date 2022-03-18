const express = require('express');
const response = require ( '../../network/response' );
const controller = require('./controller')
const router = express.Router();

router.post('/', (req, res) => {
    controller.addProduct()
        .then(product => {
            response.success(req, res, req.query.product, 200);
        }).catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });

});

router.get('/', (req, res) => {
    controller.getProduct()
        .then( data => {
            response.success(req, res, data, 201);
        })
        .catch( err => {
            response.error( req, res, 'Intertnal error', 500, err )
        });
});



module.exports = router;