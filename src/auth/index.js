const jwt = require('jsonwebtoken');

function sign( data ) {
    return jwt.sign(JSON.stringify(data), 'secreto');
}

module.exports = {
    sign,
}