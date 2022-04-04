const response = require ( '../network/response' );


function logErrors(err, req, res, next) {
    next(err);
}

// errores no controlables
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

// errores contemplados
function boomErrorHandler(err, req, res, next) {
    if( err.isBoom ){
        const { output } = err;
        return res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

module.exports = {
    logErrors,
    errorHandler,
    boomErrorHandler
}