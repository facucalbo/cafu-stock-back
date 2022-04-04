const store = require('./store');
const userStore = require('../user/store')
const auth = require('../../auth')

const boom = require('@hapi/boom');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

async function upsert( data ){
    if(!typeof(data.id) === 'object') {
        return store.update();
    }
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

    return bcrypt.compare(password, authData.password)
        .then( areEquals => {
            if(!areEquals){
                throw boom.badData('Incorrect password');
            }
            return auth.sign(userData);   
        }).catch((err) => {
            
        });

}

module.exports = {
    upsert,
    login
}