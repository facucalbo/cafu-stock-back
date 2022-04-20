const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const secureHandler = require('../../middlewares/secure.handler');
const router = express.Router();

router.post('/login', (req, res, next) => {
    // const session = req.session;
    controller.login(req.body.username, req.body.password)
        .then( data => {
            const options = {
                httpOnly: true,
                // maxAge: 60,
                // withCredentials: true,
                path: '/',
                secure: false,
            }
            res.cookie('id', data.token, options);
            response.success(req, res, data.error, 201);
        })
        .catch(next)
});

router.post('/logout', (req, res, next) => {
    controller.logout()
        .then(data => {
            
        }).catch(next);
})

module.exports = router;