import User from "../models/User.js";
import { Ingredient } from "../models/Ingredient.js";
import { Recipe } from "../models/Recipe.js";

export const search = async (req, res, next) => {
  const query = req.query.q || "";

  console.log("searched:", query);
  try {
    // חיפוש מתכונים
    const recipes = await Recipe.find({
      "recipeData.recipeName": { $regex: query, $options: "i" },
    });

    // חיפוש משתמשים
    const users = await User.find({
      userName: { $regex: query, $options: "i" },
    });

    // חיפוש רכיבים
    const ingredients = await Ingredient.find({
      name: { $regex: query, $options: "i" },
    });

    res.json({ recipes, users, ingredients });
  } catch (error) {
    next(error);
  }
};

//
//
//
export const autoSearch = async (req, res, next) => {
  const query = req.query.q || "";

  console.log("!!searched:", query);
  try {
    // Search for recipes
    const recipes = await Recipe.find({
      "recipeData.recipeName": { $regex: query, $options: "i" },
    }).limit(5);

    // Search for users
    const users = await User.find({
      userName: { $regex: query, $options: "i" },
    }).limit(5);

    // Search for ingredients
    const ingredients = await Ingredient.find({
      name: { $regex: query, $options: "i" },
    }).limit(5);

    res.json({ recipes, users, ingredients });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
