const db = require('../data/db-config');

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    isValid,
    findBy
}


function getUsers() {
    return db('user');
};

function getUserById(id) {
    return db('user').where({id}).first();
};

function addUser(user) {
    return db('user').insert(user)
        .then(id => {
            return getUserById(id)
        });
};

function updateUser(id, body) {
    return db('user').where({id}).update(body)
        .then(id => {
            return getUserById(id)
        });
};

function deleteUser(id) {
    return db('user').where({id}).del()
        .then(id => {
            return getUserById(id)
        });
};

function findBy(filter) {
    return db('user').where(filter).orderBy('id');
}

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string')
}
