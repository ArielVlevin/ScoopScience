

const { getIngredients } = require('./newget');
const { postIngredients } = require('./newpost');


async function ingredientsRouter(app){

getIngredients(app);
postIngredients(app);


}


module.exports = {ingredientsRouter}