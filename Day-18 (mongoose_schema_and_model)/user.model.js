

const users = require('./user.mongo');

function addUserToDatabase(user) {
    return users.findOneAndUpdate(user);
}


module.exports = {
    addUserToDatabase
}