const Model = require('./model');

// add new product
function addProduct( product ){
    const myProduct = new Model( product );

    return myProduct.save();
}

// search all products
function getAllProduct(){
    return Model.find();
}

function searchProduct( text ){
    // return Model.find( {$or: [{type: value}, {brand: value}, {model: value}]} );
    return Model.find({$text: {$search: text}})
}

function deleteProduct( productId ) {
    console.log(productId);
    return Model.deleteOne({_id: productId});
}

module.exports = { 
    add: addProduct,
    getAll: getAllProduct,
    search: searchProduct,
    delete: deleteProduct
}