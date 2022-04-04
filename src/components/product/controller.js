const store = require('./store');
const boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

function addProduct( product ){
    const { error } = validateBody( product )
    if( error ) {
        throw boom.badRequest(error.details.map( d => d.message ));
    }

    const myProduct = product;
    return store.add( myProduct );
}

function getAllProduct(){
    return store.getAll();
}

function searchProduct( text ) {
    return store.search( text );
}

function deleteProduct( productId ) {
    if(productId == 'undefined') {
        throw boom.notFound('Product not found');
    }
    return store.delete( productId )
}

function validateBody( body = {} ) {
    const schema = Joi.object({
        type: Joi.string().required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        package: Joi.number().required(),
        stock: Joi.number().required(),
        price: Joi.number().required(),
    })
    return schema.validate( body );
}

module.exports = {
    addProduct,
    getAllProduct,
    searchProduct,
    deleteProduct,
}