const { getDataByID, getLastInsertedID } = require('../database/crud');
const Ingredient = require('../models/Ingredient');

async function getIngredients(app) {

  app.get('/get/ingredient/:id', async (req, res) => {
    const ingredientsID = req.params.id;
    try {
      const ingredients = await getDataByID(ingredientsID, 'Ingredients');

      if (ingredients) {
        res.status(200).json(ingredients);
      } else {
        res.status(404).json({ message: 'Ingredient not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/get/ingredients/lastid/:category', async (req, res) => {
    const categoryName = req.params.category;
    try {
      const id = await getLastInsertedID(categoryName);

      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({ message: 'ID not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/get/ingredients/ingredientsArray', async (req, res) => {
    try {
      const ingredients = await Ingredient.find({});

      const ingredientsByCategory = ingredients.reduce((acc, ingredient) => {
        const { category, id, name } = ingredient;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({ id, name });
        return acc;
      }, {});

      res.status(200).json(ingredientsByCategory);
    } catch (error) {
      console.error('Error fetching ingredients by category:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/get/ingredients/ingredientsArray/:recipe', async (req, res) => {
    const recipeName = req.params.recipe;
    console.log('recipeName: ', recipeName);

    let ingredientIds = ['510001'];
    if (recipeName === 'gelato') {
      ingredientIds = ['510001', '520001'];
    } else if (recipeName === 'iceCream') {
      ingredientIds = ['510001', '520001', '580001'];
    } else if (recipeName === 'sorbet') {
      ingredientIds = ['570001', '520001', '540001'];
    } else if (recipeName === 'other') {
      ingredientIds = ['570001', '520001', '560001'];
    }

    try {
      const ingredients = await Ingredient.find({ id: { $in: ingredientIds } });

      res.status(200).json(ingredients);
    } catch (error) {
      console.error('Error fetching basic ingredients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

}

module.exports = { getIngredients };