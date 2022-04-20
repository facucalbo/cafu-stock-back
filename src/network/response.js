exports.success = function ( req, res, message, status ) {
    //podemos usar logs para visualizar los errores, por ejemplo, error con la conexion a la base de datos
    //esa informacion no se la podemos dar al cliente, por eso la podemos poner aca como console.log.

    res.status(status).send({
        error: false,
        body: message
    });
}

exports.error = function ( req, res, message, status ) {
    res.status(status).send({
        error: true,
        body: message
    })
    
}