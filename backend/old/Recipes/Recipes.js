import getRecipes from "./get.js";
import postRecipes from "./post.js";

export default async function recipesRouter(app) {
  getRecipes(app);
  postRecipes(app);
}
