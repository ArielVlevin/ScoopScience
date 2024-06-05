/*
const recipeData = {
    id: "1234567",
    recipeName: "Vanilla Ice Cream",
    user: {
    id: "user123",
      userName: "John Doe"
    },
    specialMarks: {
      lowSugar: false,
      highSugar: true,
      subSugar: false,
      lowFat: false,
      highFat: true,
      vegan: false,
      withEggs: true
    },
    recipeRating: {
      likes: 100,
      ratingValue: 4.5,
      ratingAmount: 50
    },
    recipeIngredient: {
      ingredients: [
        [
          {
            id: "milk001",
            name: "Milk",
            category: "milk base",
            fat_percentage: 2.5,
            solids_percentage: 8.0
          },
          500
        ],
        [
          {
            id: "sugar001",
            name: "Sugar",
            category: "sugars",
            fat_percentage: 0.0,
            solids_percentage: 100.0
          },
          200
        ]
      ],
      kind: "ice cream",
      totalWeight: 700,
      butterFat: 25.0,
      msnf: 10.5,
      pac: 0.1,
      pod: 0.05,
      totalSolid: 108.0
    }
  };
*/





const PORT = 3000;
const express = require('express');
const {insertData} = require('./database/insert');
const {recipesRouter} = require('./database/Recipes');
const {ingredientsRouter} = require('./database/Ingridients');
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


const ingridientData = {
  id: "m_0003",
  name: "Milk 3%",
  category: "milk base",
  sugar: 4.8,
  fat: 3,
  protiens: 3.3,
  otherSolids: 0.7,
  totalSolids: 11.8,
  water: 88.2, 
  msnf: 8.8,          //milk-solids-not-fat

};



recipesRouter(app);
ingredientsRouter(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





