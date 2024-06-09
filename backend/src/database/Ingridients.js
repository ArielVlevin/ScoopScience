

const {getDataByID, getLastInsertedID} = require('./get');
const {insertData} = require('./insert');
const {closeDatabaseConnection, connectToDatabase} = require('./connect');


async function ingredientsRouter(app){
  app.get('/ingredients/:id', async(req,  res) => {
       const ingredientsID = req.params.id;
        try{
           const ingredients = await getDataByID(ingredientsID, 'Ingredients');

           if (ingredients) {
               res.status(200).json(ingredients);
           } else {
               res.status(404).json({ message: 'ingredient not found' });
           }
       } catch (error) {
           res.status(500).json({ message: 'Internal Server Error' });
  }})



  app.get('/ingredients/lastid/:category', async(req,  res) => {
    const categoryName = req.params.category;
    console.log(`category name: ${categoryName}`);
    try{
        const id = await getLastInsertedID(categoryName);

        if (id) {
            res.status(200).json(id);
        } else {
            res.status(404).json({ message: 'id did not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
  }})



  app.get('/ingredientsArray', async (req, res) => {
    try {
      const db = await connectToDatabase();
      const ingredients = await db.collection('Ingredients').find({}).toArray();
  
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
    } finally {
      await closeDatabaseConnection();
    }
  });


app.post('/ingredients', async (req, res) => {
    try {
      const ingredient = req.body;

      const insertedID = await insertData(ingredient, 'Ingredients');
      res.status(201).json({ insertedID });
      console.log('\nRecipe received and inserted:', ingredient);
    } catch (error) {
      console.error('Error inserting ingredient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}


module.exports = {ingredientsRouter}