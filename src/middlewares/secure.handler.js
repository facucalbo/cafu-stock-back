const auth = require('../auth');

module.exports = checkAuth = ( action ) => {
    function checkHandler(req, res, next) {
        switch( action ) {
            case 'owner':
                const owner = req.params.ownerId || req.body.ownerId;
                auth.check.own(req, owner);
                next();
                break;
            case 'logged':
                auth.check.logged(req, res);
                next();
                break;
            default:
                next();
        }
    }

    return checkHandler;
}