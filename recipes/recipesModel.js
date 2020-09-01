const db = require('../data/db-config');

module.exports = {
    getRecipes,
    getRecipeById,
    addRecipe,
    editRecipe,
    deleteRecipe,
    isValid
}

function getRecipes() {
    return db('recipes');
}

function getRecipeById(id) {
    return db('recipes').where({id}).first();
}

// remove .returning('*') and uncomment .then() statement when using sqlite3

function addRecipe(recipe) {
    return db('recipes').insert(recipe).returning('*');
}

// function addRecipe(recipe) {
//     return db('recipes').insert(recipe)
//         .then(id => {
//             return getRecipeById(id)
//         })
// }


function editRecipe(id, body) {
    return db('recipes').where({id}).update(body).returning('*');
        // .then(id => {
        //     return  getRecipeById(id[0])
        // })
}

function deleteRecipe(id) {
    return db('recipes').where({id}).del().returning('*');
        // .then(id => {
        //     return getRecipeById(id[0])
        // })
}

function isValid(recipe) {
    return Boolean(recipe.title && recipe.source & recipe.ingredients && recipe.instructions);
}
