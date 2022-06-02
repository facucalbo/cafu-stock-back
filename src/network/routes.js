const express = require('express');
const user = require('../components/user/network');
const product = require('../components/product/network');
const auth = require('../components/auth/network');
const sales = require('../components/realizedSale/network');

const routes = function ( server ) {
    server.use('/api/v1/user', user);
    server.use('/api/v1/product', product);
    server.use('/api/v1/auth', auth);
    server.use('/api/v1/sales', sales);
}

module.exports = routes;