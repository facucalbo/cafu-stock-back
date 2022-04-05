const auth = require('../auth');

module.exports = checkAuth = ( action ) => {
    function checkHandler(req, res, next) {
        switch( action ) {
            case 'update':
                const owner = req.params._id || req.body._id;
                auth.check.own(req, owner);
                next();
                break;
            default:
                next();
        }
    }

    return checkHandler;
}