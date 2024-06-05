

const {getDataByID} = require('./get');
const {insertData} = require('./insert');


async function ingredientsRouter(app){
   app.get('/ingridients/:id', async(req,  res) => {
       const ingredientsID = req.params.id;
       console.log(`ingredient id: ${ingredientsID}`);
       try{
           const ingredients = await getDataByID(ingredientsID, 'Ingridients');

           if (ingredients) {
               res.status(200).json(ingredients);
           } else {
               res.status(404).json({ message: 'Ingredient not found' });
           }
       } catch (error) {
           res.status(500).json({ message: 'Internal Server Error' });
}})

app.post('/ingridients', async (req, res) => {
    try {
      const ingredient = req.body;

      const insertedID = await insertData(ingredient, 'Ingridients');
      res.status(201).json({ insertedID });
      console.log('\nRecipe received and inserted:', ingredient);
    } catch (error) {
      console.error('Error inserting ingredient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}


module.exports = {ingredientsRouter}