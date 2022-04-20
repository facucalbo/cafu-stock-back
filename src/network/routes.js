const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');
const chat = require('../components/chat/network');
const product = require('../components/product/network');
const auth = require('../components/auth/network');
const sales = require('../components/realizedSale/network');

const routes = function ( server ) {
    server.use('/message', message);
    server.use('/user', user);
    server.use('/chat', chat);
    server.use('/product', product);
    server.use('/auth', auth);
    server.use('/sales', sales);
}

module.exports = routes;