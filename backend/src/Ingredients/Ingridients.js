

const { getIngredients } = require('./get');
const { postIngredients } = require('./post');


async function ingredientsRouter(app){

getIngredients(app);
postIngredients(app);


}


module.exports = {ingredientsRouter}