const Model = require('./model');

function addNew(user, products, client) {
    const mySale = new Model({
        sellerUser: user,
        products: products,
        client: client,
        date: new Date()
    });

    return mySale.save();
}

function get() {

}

module.exports = {
    addNew,
    get,
}