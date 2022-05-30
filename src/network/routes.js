const express = require('express');
const user = require('../components/user/network');
const product = require('../components/product/network');
const auth = require('../components/auth/network');
const sales = require('../components/realizedSale/network');

const routes = function ( server ) {
    server.use('/user', user);
    server.use('/product', product);
    server.use('/auth', auth);
    server.use('/sales', sales);
}

module.exports = routes;