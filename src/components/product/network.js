const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res) => {
    controller.addProduct( req.body )
        .then( product => {
            response.success(req, res, product, 201);
        })
        .catch( err => {
            response.error(req, res, 'Error', 201);
        })
});

router.get('/', (req, res) => {
    controller.getAllProduct()
        .then( product => {
            response.success(req, res, product, 201);
        })
        .catch( err => {

        })
});

router.get('/:search', (req, res) => {
    controller.searchProduct( req.params.search )
        .then( products => {
            response.success( req, res, products, 201)
        })
        .catch()
})

router.delete('/:id', (req, res) => {
    controller.deleteProduct( req.params.id )
        .then( products => {
            response.success( req, res, products, 201)
        })
        .catch()
})

module.exports = router;