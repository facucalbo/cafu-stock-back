const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

router.post('/login', (req, res) => {
    controller.login(req.body.username, req.body.password)
        .then( data => {
            console.log(data);
            response.success(req, res, data, 201);
        })
        .catch( err => {
            console.log(err);
            response.error( req, res, err.message, 500 )
        })
});



module.exports = router;