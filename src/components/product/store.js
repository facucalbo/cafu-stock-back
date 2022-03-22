const Model = require('./model');

// add new product
function addProduct( product ){
    console.log(product);
    const myProduct = new Model( product );

    return myProduct.save();
}

// search all products
function getProduct(){
    return Model.find();
}

module.exports = { 
    add: addProduct,
    get: getProduct,
}