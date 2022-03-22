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
            console.log(err);
            response.error(req, res, 'Error', 201);
        })
});

router.get('/', (req, res) => {
    controller.getProduct()
        .then( product => {

        })
        .catch( err => {

        })
});

module.exports = router;