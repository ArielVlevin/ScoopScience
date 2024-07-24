
/*

const {getDataByID} = require('../database/get');
const {connectToDatabase} = require('../database/connect');


async function getRecipes(app){

   app.get('/get/recipe/:id', async(req,  res) => {
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
}});


app.get('/get/recipes/recipesArray', async (req, res) => {
   try {
     const db = await connectToDatabase();
     const recipes = await db.collection('Recipes').find({}).toArray();
   
     res.status(200).json(recipes);
   } catch (error) {
     console.error('Error finding recipes:', error);
     res.status(500).json({ message: 'Internal Server Error' });
   }
   });



}//getRecipes//

module.exports = {getRecipes}

*/