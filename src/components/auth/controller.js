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

    const {token, refreshToken} = await bcrypt.compare(password, authData.password)
        .then( areEquals => {
            if(!areEquals){
                throw boom.badRequest('Incorrect password');
            }
            const token = auth.sign(userData, config.jwt.accessAge);
            const refreshToken = auth.sign(token, config.jwt.refreshAge);

            store.addToken(token, userData._id);

            return {token: token, refreshToken: refreshToken};
        }).catch((err) => {
            throw err;
        });

    const body = {
        token, 
        refreshToken, 
        uid: userData._id
    };

    return body;
}

async function refreshToken( header ) {
    const refreshToken = req.header.authorization || req.headers.cookie;
    // const uid = req.params.uid;

    if(!refreshToken) throw boom.badRequest('Refresh token not provided')

    const accessToken = auth.sign(refreshToken, config.jwt.refreshSecret);

    store.tokenIsValid(accessToken)
    
}

module.exports = {
    upsert,
    login,
    refreshToken
}