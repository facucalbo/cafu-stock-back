const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const config = require('../config');
const sessions = require('express-session');

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
    logged: (req, res) => {
        res.locals.user = decodeHeader(req);
    }
}

function decodeHeader(req) {
    // console.log(req.headers);
    const authorization = req.headers.cookie || req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    req.username = decoded.username;
    return decoded;
}

function getToken(auth) {
    if(!auth) {
        throw boom.unauthorized('Auth session is not provided');
    }
    const headers = auth.split(';');
    let token = headers.find(c => c.indexOf('id=') === 0) || '';
    token = token.replace('id=', '');
    if(!token) throw boom.badData('Invalid token');
    return token;
}

const expireAge = 1000 * 60 * 60 * 24;

const session = sessions({
    name: 'sid',
    secret: config.jwt.secret,
    saveUninitialized: true,
    cookie: { maxAge: expireAge },
    resave: false,
})

module.exports = {
    sign,
    check,
    session,
}