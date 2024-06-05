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
const bodyParser = require('body-parser');

const cors = require('cors');


const app = express();


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) ;

app.use(bodyParser.json());


recipesRouter(app);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





