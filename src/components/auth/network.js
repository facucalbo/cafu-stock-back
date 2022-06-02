const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

router.post('/login', (req, res, next) => {
    controller.login(req.body.username, req.body.password)
        .then( data => {
            const options = {
                httpOnly: true,
                // maxAge: 60,
                path: '/',
                sameSite: "none",
                secure: false
            }
            res.cookie('c_token', data.token, options);
            response.success(req, res, data, 201);
        })
        .catch(next)
});

router.post('/logout', (req, res, next) => {
    controller.logout()
        .then(data => {
            
        }).catch(next);
})

router.post('/refresh-token', (req, res, next) => {
    controller.refreshToken(req.headers, req.params)
        .then(d => {
            response.success(req, res, d.accessToken, 201);
        }) .catch(next)
})

module.exports = router;