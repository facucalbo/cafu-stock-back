const store = require('./store');
const userStore = require('../user/store')
const auth = require('../../auth')

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

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

    const res = await bcrypt.compare(password, authData.password)
        .then( areEquals => {
            if(!areEquals){
                throw boom.badRequest('Incorrect password');
            }
            const token = auth.sign(userData);
            return {token: token}
        }).catch((err) => {
            throw err;
        });
    return res;
}

module.exports = {
    upsert,
    login
}