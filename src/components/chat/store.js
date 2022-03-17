const Model = require('./model');

function addChat( chat ) {
    const myChat = new Model( chat )

    return myChat.save();
}

function getChat() {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('users')
            .exec( (error, populated) => {
                if( error ) {
                    console.log(error);
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    })
}

module.exports = {
    add: addChat,
    get: getChat,
}