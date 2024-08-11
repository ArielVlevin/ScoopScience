import { Recipe } from "../models/Recipe.js";

const getLastRecipeID = async () => {
  const lastRecipe = await Recipe.findOne().sort({ _id: -1 });
  return lastRecipe ? lastRecipe._id : 0;
};

export const createRecipe = async (req, res, next) => {
  try {
    const new_id = (await getLastRecipeID()) + 1;

    const data = JSON.parse(req.body.recipeData);
    const recipeRating = JSON.parse(req.body.recipeRating);
    const recipeIngredient = JSON.parse(req.body.recipeIngredient);

    const photoPath = req.file ? req.file.path : null;

    const newRecipeData = {
      _id: new_id,
      recipeData: {
        ...data,
        photo: photoPath,
      },
      recipeRating,
      recipeIngredient,
    };

    const newRecipe = new Recipe(newRecipeData);

    await newRecipe.save();

    res.status(201).json(newRecipe);
    console.log(
      "\nNew Recipe created successfully:\nid: ",
      newRecipe._id,
      ", name:",
      newRecipe.recipeData.recipeName,
      "\n"
    );
  } catch (error) {
    next(error);
  }
};

export const getRecipe = async (req, res, next) => {
  const recipeID = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeID).exec();
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({}).exec();
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};
export const getRecipesByKind = async (req, res, next) => {
  const recipeKind = req.params.kind;

  try {
    const recipes = await Recipe.find({
      "recipeData.recipeKind": recipeKind,
    }).exec();
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else if (recipes.length === 0) {
      res.status(200).json([]);
    }
  } catch (error) {
    next(error);
  }
};

export const setRate = async (req, res) => {
  const { user_id, ratingValue } = req.body;
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);
    const existingRating = recipe.recipeRating.ratingUsers.find(
      (rating) => rating.user_id === user_id
    );

    if (existingRating) {
      existingRating.ratingValue = ratingValue;
    } else {
      recipe.recipeRating.ratingUsers.push({ user_id, ratingValue });
    }

    const totalRatingValue = recipe.recipeRating.ratingUsers.reduce(
      (acc, rating) => acc + rating.ratingValue,
      0
    );

    recipe.recipeRating.ratingValue =
      totalRatingValue / recipe.recipeRating.ratingUsers.length;

    recipe.recipeRating.ratingAmount = recipe.recipeRating.ratingUsers.length;

    await recipe.save();
    res.status(200).json({ message: "Rating updated", recipe });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
