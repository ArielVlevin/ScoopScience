const Ingredient = require('../models/Ingredient');

const {  getLastInsertedID } = require('../database/crud');

async function postIngredients(app) {

  app.post('/post/ingredients', async (req, res) => {
    try {
   
     const {  name, category, calories, sugar, fat, totalSolids, msnf, protein } = req.body;
     const newID = await getLastInsertedID(category)+1;

     const newIngredient = new Ingredient({
      _id: newID,
      name,
      category,
      calories,
      sugar,
      fat,
      totalSolids,
      msnf,
      protein,
      image: '../../assets/ingredients/vanila.jpg',
    });

    await newIngredient.save();

      res.status(201).json(newIngredient );
    } catch (error) {
      console.error('Error inserting ingredient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = { postIngredients };


