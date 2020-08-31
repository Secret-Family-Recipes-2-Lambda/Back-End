const db = require('./dbConfig');

module.exports = {
    add, 
    find,
    findBy,
    findById,
    isValid,
    getRecipes,
    getRecipeById,
    addRecipe,
    editRecipe,
    deleteRecipe,
    isValidRecipe
}

function find() {
    return db('user').select('id', 'username');
};

function findBy(filter) {
    return db('user').where(filter).orderBy('id');
};

function findById(id) {
    return db('user').where({id}).first();
};

async function add(user) {
    try {
        const [id] = await db('user').insert(user, 'id');

        return findById(id);
    } catch (err) {
        throw err
    }
};

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string');
};


function getRecipes() {
    return db('recipes');
}

function getRecipeById(id) {
    return db('recipes').where({id}).first();
}

// remove .returning('*') and uncomment .then() statement when using sqlite3

// function addRecipe(recipe) {
//     return db('recipes').insert(recipe).returning('*');
// }

// function addRecipe(recipe) {
//     return db('recipes').insert(recipe)
//         .then(id => {
//             return getRecipeById(id)
//         })
// }


async function addRecipe(recipe) {
    try {
        const [id] = await db('recipes').insert(recipe, 'id');

        return getRecipeById(id);
    } catch (err) {
        throw err
    }
};



function editRecipe(id, body) {
    return db('recipes').where({id}).update(body)
        .then(id => {
            return  getRecipeById(id)
        })
}

function deleteRecipe(id) {
    return db('recipes').where({id}).del()
        .then(id => {
            return getRecipeById(id)
        })
}



function isValidRecipe(recipe) {
    return Boolean(recipe.title && recipe.source & recipe.ingredients && recipe.instructions);
}