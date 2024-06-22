



const PORT = 3000;
const express = require('express');
const {recipesRouter} = require('./Recipes/Recipes');
const {ingredientsRouter} = require('./Ingredients/Ingridients');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}



const app = express();
app.use(cors(corsOptions)) ;
app.use(bodyParser.json());






recipesRouter(app);
ingredientsRouter(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





