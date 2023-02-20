const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const config = require('../config');

function sign( data, secret, expireAge ) {
    const payload = { data }

    return jwt.sign(payload, config.jwt.secret, { expiresIn: expireAge });
}

function verify(token, secret) {
    try {
        return jwt.verify(token, secret);
    }catch(err) {
        throw boom.unauthorized('Invalid token')
    }
}

const check = {
    authorized: (req, user) => {
        const authorization = decodeHeader(req)
        const token = decodeToken(authorization);
        const payload = verify(token, config.jwt.secret);
        req.username = payload.username;
        
        if(payload.data._id !== user) throw boom.unauthorized('Have not access');
    },
    logged: (req, res) => {
        res.locals.user = decodeHeader(req);
    },
    authenticated: (req, res) => {
        const authorization = decodeHeader(req);
        const decodedToken = decodeToken(authorization);
        const payload = verify(decodedToken, config.jwt.secret);
        res.locals.authorization = payload;
    }
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || req.headers.cookie ||  '';
    if(!authorization) throw boom.unauthorized('Need token');
    return authorization;
}

function decodeToken(authorization) {
    if(!authorization) throw boom.unauthorized('Auth session is not provided');
    // const headers = auth.split('; ');
    // let token = headers.find(c => c.indexOf('c_token=') === 0) || '';
    // token = token.replace('c_token=', '');
    let token = authorization.replace('Bearer ', '');
    if(!token) throw boom.badData('Invalid token');

    return token;
}

module.exports = {
    sign,
    check,
}