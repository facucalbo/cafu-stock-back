const store = require('./store');

function addProduct( product ){
    if(!product) {
        
    }

    const myProduct = {product};

    return store.add( myProduct );

}

function getProduct(){
    return store.get();
}

module.exports = {
    addProduct,
    getProduct
}