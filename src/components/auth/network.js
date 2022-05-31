const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const secureHandler = require('../../middlewares/secure.handler');
const router = express.Router();

router.post('/login', (req, res, next) => {
    // const session = req.session;
    console.log(req.headers);
    controller.login(req.body.username, req.body.password)
        .then( data => {
            const options = {
                httpOnly: false,
                // maxAge: 60,
                path: '/',
                sameSite: "none",
                secure: false
            }
            res.cookie('sessionId', data.token, options);
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