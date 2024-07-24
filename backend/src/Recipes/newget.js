const Recipe = require('../models/Recipe'); 

async function getRecipes(app) {
  app.get('/get/recipe/:id', async (req, res) => {
    const recipeID = req.params.id;
    try {
      const recipe = await Recipe.findById(recipeID).exec();
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: 'Recipe not found' });
      }
    } catch (error) {
      console.error('Error retrieving recipe:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/get/recipes/recipesArray', async (req, res) => {
    try {
      const recipes = await Recipe.find({}).exec();
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Error finding recipes:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = { getRecipes };