

const {getDataByID} = require('./get');
const {insertData} = require('./insert');


async function recipesRouter(app){
   app.get('/recipes/:id', async(req,  res) => {
    const recipeID = req.params.id;
    try{
      const recipe = await getDataByID(recipeID, 'Recipes');
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: 'Recipe not found' });
      }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
}})

app.post('/recipes', async (req, res) => {
    try {
      const recipe = req.body;
      const insertedId = await insertData(recipe, 'Recipes');
      res.status(201).json({ insertedId });
    } catch (error) {
      console.error('Error inserting recipe:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = {recipesRouter}