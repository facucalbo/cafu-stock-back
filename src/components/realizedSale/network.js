const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const secureHandler = require('../../middlewares/secure.handler');
const router = express.Router();

router.post('/', secureHandler('logged'), (req, res, next) => {
    const products = req.body.products || '';
    const client = req.body.client || '';
    controller.addSale( res.locals.user, products, client )
        .then(sale => {
            response.success(req, res, sale, 201);
        }).catch(next);
})

module.exports = router;