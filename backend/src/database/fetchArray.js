const ingridientData = [{
   id: "510001",
   name: "Milk 3%",
   category: "dairy",
   calories: 300,
   sugar: 4.8,
   fat: 3,
   protien: 3.3,
   totalSolids: 11.8,
   msnf: 8.8,
 },
 {
   id: "520001",
   name: "Sugar",
   category: "sugars",
   calories: 400,
   sugar: 100,
   fat: 0,
   protien: 0,
   totalSolids: 100,
   msnf: 0,
 },
 {
   id: "530001",
   name: "Stabilizer X",
   category: "stabilizer",
   calories: 0,
   sugar: 0,
   fat: 0,
   protien: 0,
   totalSolids: 0,
   msnf: 0,
 },
 {
   id: "540001",
   name: "Strawberry",
   category: "fruits",
   calories: 32,
   sugar: 4.9,
   fat: 0.3,
   protien: 0.7,
   totalSolids: 7.7,
   msnf: 0,
 },
 {
   id: "550001",
   name: "Chocolate Chips",
   category: "adding",
   calories: 540,
   sugar: 50,
   fat: 30,
   protien: 6,
   totalSolids: 86,
   msnf: 0,
 },
 {
   id: "560001",
   name: "Almonds",
   category: "nuts",
   calories: 575,
   sugar: 3.9,
   fat: 49.4,
   protien: 21.2,
   totalSolids: 74.5,
   msnf: 0,
 },
 {
   id: "570001",
   name: "Water",
   category: "liquid",
   calories: 0,
   sugar: 0,
   fat: 0,
   protien: 0,
   totalSolids: 0,
   msnf: 0,
 },
 {
   id: "580001",
   name: "Vanilla Extract",
   category: "other",
   calories: 288,
   sugar: 12.7,
   fat: 0,
   protien: 0,
   totalSolids: 12.7,
   msnf: 0,
 },
 ];
 
 async function insertAllIngredients(ingredients) {
   try {
         for (const ingredient of ingredients) {
       await insertData(ingredient, 'Ingredients');
     }
   } finally {
     await closeDatabaseConnection(); // Close connection after all inserts
   }
 }
 
 insertAllIngredients(ingridientData)
   .then(() => {
     console.log('All ingredients inserted successfully');
   })
   .catch((error) => {
     console.error('Error inserting ingredients:', error);
   });