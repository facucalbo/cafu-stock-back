const express = require('express');

const secureHandler = require('../../middlewares/secure.handler');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/:ownerId', secureHandler('owner'), (req, res, next) => {
    controller.addProduct( req.body )
        .then( product => {
            response.success(req, res, product, 201);
        })
        .catch(next)
});

router.get('/owner/:ownerId', secureHandler('owner'), (req, res, next) => {
    // console.log(req.headers);
    controller.getAllProduct( req.params.ownerId )
        .then( product => {
            response.success(req, res, product, 201);
        })
        .catch(next)
});

router.get('/search/:search', secureHandler('logged'), (req, res, next) => {
    controller.searchProduct( req.params.search )
        .then( products => {
            response.success( req, res, products, 201)
        })
        .catch(next)
});

router.delete('/:id/:ownerId', secureHandler('owner'), (req, res, next) => {
    controller.deleteProduct( req.params.id )
        .then( product => {
            response.success( req, res, product, 201)
        })
        .catch(next)
});

module.exports = router;