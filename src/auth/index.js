const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const config = require('../config');

function sign( data, expireAge ) {

    const payload = { data }

    return jwt.sign(payload, config.jwt.secret, { expiresIn: expireAge });
}

function verify(token) {
    return jwt.verify(token, config.jwt.secret);
}

const check = {
    authorized: (req, user) => {
        const payload = decodeHeader(req);
        if(payload.data._id !== user) throw boom.unauthorized('Have not access');
    },
    logged: (req, res) => {
        res.locals.user = decodeHeader(req);
    }
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || req.headers.cookie ||  '';
    const token = getToken(authorization);
    const payload = verify(token);
    req.username = payload.username;
    return payload;
}

function getToken(authorization) {
    if(!authorization) throw boom.unauthorized('Auth session is not provided');

    // const headers = auth.split('; ');
    // let token = headers.find(c => c.indexOf('c_token=') === 0) || '';
    // token = token.replace('c_token=', '');
    let token = authorization.replace('Bearer ', '')

    if(!token) throw boom.badData('Invalid token');

    return token;
}

const expireAge = 180 * 60 * 60 * 24;

module.exports = {
    sign,
    check,
}