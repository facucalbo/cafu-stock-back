const Model = require('./model');

// add new product
function addProduct( product ){
    const myProduct = new Model( product );

    return myProduct.save();
}

// search all products
async function getAllProduct( ownerId ){
    return Model.find({owner: ownerId});
}

function searchProduct( text ){
    // return Model.find( {$or: [{type: value}, {brand: value}, {model: value}]} );
    return Model.find({$text: {$search: text}})
}

// delete specific document from collection
function deleteProduct( productId ) {
    // response = Model.deleteOne({_id: productId});
    // console.log(response);

    // return { _id: productId, response };
    return Model.deleteOne({_id: productId});
}

module.exports = { 
    add: addProduct,
    getAll: getAllProduct,
    search: searchProduct,
    delete: deleteProduct
}