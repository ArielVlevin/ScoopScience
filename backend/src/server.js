// Define the JSON data
const recipeData = {
    recipeId: "123456",
    recipeName: "Vanilla Ice Cream",
    user: {
      userID: "user123",
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
            ingredientID: "milk001",
            name: "Milk",
            category: "milk base",
            fat_percentage: 2.5,
            solids_percentage: 8.0
          },
          500
        ],
        [
          {
            ingredientID: "sugar001",
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



const express = require('express');
const  {connectToDatabase, insertData} = require('./db');

connectToDatabase();
const app = express();

app.get('/', (req,  res) => {
    res.send('Hello, World!');
});

app.get('/recipes/123456', (req,  res) => {
    res.send(recipeData);
});

insertData(recipeData, 'Recipes');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const { MongoClient } = require('mongodb');



