

const {getRecipes} = require('./get');
const {postRecipes} = require('./post');


async function recipesRouter(app){

  getRecipes(app);
  postRecipes(app);

}

module.exports = {recipesRouter}