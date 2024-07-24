
const {getRecipes} = require('./newget');
const {postRecipes} = require('./newpost');


async function recipesRouter(app){

  getRecipes(app);
  postRecipes(app);

}

module.exports = {recipesRouter}

