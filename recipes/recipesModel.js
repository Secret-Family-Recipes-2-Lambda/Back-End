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

function addRecipe(recipe) {
    return db('recipes').insert(recipe).returning('*');
        // .then(id => {
        //     return getRecipeById(id)
        // })
}

function editRecipe(id, body) {
    return db('recipes').where({id}).update(body).returning('*');
        // .then(id => {
        //     return  getRecipeById(id)
        // })
}

function deleteRecipe(id) {
    return db('recipes').where({id}).del().returning('*');
        // .then(id => {
        //     return getRecipeById(id)
        // })
}

function isValid(recipe) {
    return Boolean(recipe.title && recipe.source & recipe.ingredients && recipe.instructions);
}