const express = require('express');
const router = express.Router();
const Recipes = require('./recipesModel');

router.get('/allRecipes', (req, res) => {
    Recipes.getRecipes()
        .then(recipes => {
            res.status(200).json({data: recipes})
        })
        .catch(err => res.status(500).json({message: err.message}))
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Recipes.getRecipeById(id)
        .then(recipe => {
            res.status(200).json({data: recipe})
        })
        .catch(err => res.status(500).json({message: err.message}))
});

router.post('/', (req, res) => {
    const recipeInfo = req.body;

    if(recipeInfo){
         Recipes.addRecipe(recipeInfo)
        .then(newRecipe => {
            res.status(200).json({data: recipeInfo})
        })
        .catch(err => res.status(500).json({message: err.message}))
    } else {
        res.status(400).json({message: 'Please enter the required fields'})
    }
   
});



router.put('/:id', (req, res) => {
    const {id} = req.params;
    const recipeInfo = req.body;
    const recipe = Recipes.getRecipeById(id);

    if(recipe){
        if(recipeInfo) {
            Recipes.editRecipe(id, recipeInfo)
                .then(editedRecipe => {
                    res.status(200).json({data: {message: 'Recipe Updated!'}, editedRecipe})
                })
                .catch(err => res.status(500).json({message: err.message}))
        } else {
            res.status(400).json({message: 'Please fill out the required fields'})
        }
    } else {
        res.status(404).json({message: 'A recipe with the specified id does not exist'})
    }
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const recipe = Recipes.getRecipeById(id);

    if(recipe){
        Recipes.deleteRecipe(id)
            .then(deletedRecipe => {
                res.status(200).json({data: {message: 'Recipe Deleted!'}, deletedRecipe })
            })
            .catch(err => res.status(500).json({message: err.message}))
    } else {
        res.status(404).json({message: 'The recipe with the specified id does not exist'})
    }
});

module.exports = router;
