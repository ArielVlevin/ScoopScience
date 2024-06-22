

const {insertData} = require('../database/insert');


async function postIngredients(app){


app.post('/post/ingredients', async (req, res) => {
    try {
      const ingredient = req.body;

      const insertedID = await insertData(ingredient, 'Ingredients');
      res.status(201).json({ insertedID });
    } catch (error) {
      console.error('Error inserting ingredient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}


module.exports = {postIngredients}