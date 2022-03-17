const store = require('./store');


function addProduct() {
    return store.add();
}

function getProduct() {
    return store.get();
}

module.exports = {
    addProduct,
    getProduct
}