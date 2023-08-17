const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

// App routes


router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipes);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipePost);
router.get('/about', recipeController.aboutUs);
router.get('/contact', recipeController.contactUs);
router.post('/contact', recipeController.contactUsPost);



//router.post('/recipe/_id', recipeController.updateRecipe);
//router.post('/recipe/:id', recipeController.deleteRecipe);



module.exports = router;
