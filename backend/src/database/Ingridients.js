

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



  app.get('/ingredientsArrayTotal', async (req, res) => {
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
    };
  });

  app.get('/ingredientsArray/:recipe', async (req, res) => {

    const recipeName = req.params.recipe;
    console.log('recipeName: ', recipeName);
    let ingredientIds = ['510001'];
    if(recipeName === 'gelato'){
      ingredientIds = ['510001', '520001'];
    }else if(recipeName === 'iceCream'){
      ingredientIds = ['510001', '520001', '580001'];
    }else if(recipeName === 'sorbet'){
      ingredientIds = ['570001', '520001', '540001'];
    }else if(recipeName === 'other'){
      ingredientIds = ['570001', '520001', '560001'];
    }

    try {
      const db = await connectToDatabase();
      
      const ingredients = await db.collection('Ingredients').find({
        id: { $in: ingredientIds }
      }).toArray();
  
      res.status(200).json(ingredients);
    } catch (error) {
      console.error('Error fetching basic gelato ingredients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
}});


app.post('/ingredients', async (req, res) => {
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


module.exports = {ingredientsRouter}