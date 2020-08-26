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

// remove .returning('*') and uncomment .then() statement when using sqlite3

function addUser(user) {
    return db('user').insert(user).returning('*');
};


// function addUser(user) {
//     return db('user').insert(user)
//         .then(id => {
//             console.log(id)
//             return getUserById(id[0])
//         });
// };




function updateUser(id, body) {
    return db('user').where({id}).update(body).returning('*');
        // .then(id => {
        //     return getUserById(id[0])
        // });
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

