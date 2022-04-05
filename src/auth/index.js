const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const config = require('../config');

function sign( data ) {
    return jwt.sign(JSON.stringify(data), config.jwt.secret);
}

function verify(token) {
    return jwt.verify(token, config.jwt.secret);
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);

        if(decoded._id !== owner) throw boom.unauthorized('Have not access');
    },
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

function getToken(auth) {
    if(!auth) throw boom.badRequest('No token provided');
    if(auth.indexOf('Bearer ') === -1) throw boom.badData('Invalid format');
    const token = auth.replace('Bearer ', '');

    return token;
}

module.exports = {
    sign,
    check,
}