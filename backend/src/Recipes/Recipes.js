import getRecipes from "./newget.js";
import postRecipes from "./newpost.js";

export default async function recipesRouter(app) {
  getRecipes(app);
  postRecipes(app);
}
