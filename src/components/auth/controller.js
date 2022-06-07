const store = require('./store');
const userStore = require('../user/store')
const auth = require('../../auth')

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const config = require('../../config');

async function upsert( data ){
    if(!typeof(data.id) === 'object') return store.update();

    const pass = await bcrypt.hash(data.password, 5);
    const userData = {
        user: data.id,
        password: pass,
    }

    return store.add( userData );
}

async function login( username, password ) {
    const userData = await userStore.query( {username: username} );
    const authData = await store.get(userData._id);

    if(userData.error) {
        throw boom.badData('Username not exist');
    }

    const {accessToken, refreshToken} = await bcrypt.compare(password, authData.password)
        .then( areEquals => {
            if(!areEquals){
                throw boom.badRequest('Incorrect password');
            }
            const accessToken = auth.sign(userData, config.jwt.secret, config.jwt.accessAge);
            const refreshToken = auth.sign(userData._id, config.jwt.refreshSecret, config.jwt.refreshAge);
            store.authenticateUser(userData._id);
            return {accessToken: accessToken, refreshToken: refreshToken};
        }).catch((err) => {
            throw err;
        });

    const body = {
        accessToken,
        refreshToken, 
        uid: userData._id
    };
    return body;
}

async function refreshToken( authorization ) {
    const response = await store.userIsAuthenticated(authorization.data);
    if(!response) throw boom.unauthorized('token_invalid');
    // el token tiene de nombre _id pq el middleware q verifica si esta authorizado tiene ese parametro
    const newAccessToken = auth.sign({_id: response.uid}, config.jwt.secret, config.jwt.accessAge);
    store.authenticateUser(response.uid);

    return newAccessToken;
}

module.exports = {
    upsert,
    login,
    refreshToken
}