const auth = require('../auth');

module.exports = checkAuth = ( action ) => {
    function checkHandler(req, res, next) {
        switch( action ) {
            case 'authorized':
                const user = req.params.uid || req.body.uid;
                auth.check.authorized(req, user);
                next();
                break;
            case 'authenticated':
                auth.check.authenticated(req, res);
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