


const mongoose = require('mongoose');

const PORT = 3000;
const express = require('express');
const {recipesRouter} = require('./Recipes/Recipes');
const {ingredientsRouter} = require('./Ingredients/Ingridients');
const bodyParser = require('body-parser');
const cors = require('cors');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = "mongodb+srv://arielvlevin:izoehktcEV1puuVl@ariel.vhe225s.mongodb.net/Gelato?retryWrites=true&w=majority&appName=Ariel";

mongoose.connect(uri, options).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});



const corsOptions ={
  origin:'*', 
  credentials:true,          
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





