

import getIngredients from './get.js';
import postIngredients from './post.js';


export default async function ingredientsRouter(app){

getIngredients(app);
postIngredients(app);


}
