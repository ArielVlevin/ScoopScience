import { Recipe } from "../models/Recipe.js";
import User from "../models/User.js";

const getLastRecipeID = async () => {
  const lastRecipe = await Recipe.findOne().sort({ _id: -1 });
  return lastRecipe ? lastRecipe._id : 0;
};

export const createRecipe = async (req, res, next) => {
  try {
    const new_id = (await getLastRecipeID()) + 1;

    const user_id = JSON.parse(req.body.user_id)._id;
    const data = JSON.parse(req.body.recipeData);
    const recipeRating = JSON.parse(req.body.recipeRating);
    const recipeIngredient = JSON.parse(req.body.recipeIngredient);

    const photoPath = req.file
      ? `/assets/${req.file.path.split("/assets/")[1]}`
      : "/assets/recipe/default_recipe_image.jpg"; // Default image if none provided

    const newRecipeData = {
      _id: new_id,
      user_id,
      recipeData: {
        ...data,
        photo: photoPath,
      },
      recipeRating,
      recipeIngredient,
    };

    const newRecipe = new Recipe(newRecipeData);

    await newRecipe.save();

    await User.findByIdAndUpdate(user_id, {
      $push: { recipes: new_id },
    });

    res.status(201).json(newRecipe);
    console.log(
      "\nNew Recipe created successfully:\nid: ",
      newRecipe._id,
      ", name:",
      newRecipe.recipeData.recipeName,
      ", user_id:",
      newRecipe.user_id
    );
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the creator or an admin
    if (
      recipe.user_id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message: "Access denied. You can only delete your own recipes.",
      });
    }

    await Recipe.findByIdAndDelete(recipeId);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getRecipe = async (req, res, next) => {
  const recipeID = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeID)
      .populate("user_id", "username")
      .exec();
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
    const recipes = await Recipe.find({})
      .populate("user_id", "username")
      .exec();
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
    })
      .populate("user_id", "username")
      .exec();

    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else if (recipes.length === 0) {
      res.status(200).json([]); //Return an empty array if no recipes found
    }
  } catch (error) {
    next(error);
  }
};

export const getPaginatedRecipes = async (req, res, next) => {
  try {
    const { limit = 9, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find({})
      .populate("user_id", "username")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      recipes,
      totalRecipes,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalRecipes / limit),
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipesByDate = async (req, res, next) => {
  const { order = "desc", limit = 9, page = 1 } = req.query;

  try {
    const recipes = await Recipe.find({})
      .sort({ createdAt: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      recipes,
      totalRecipes,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalRecipes / limit),
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipesByRate = async (req, res, next) => {
  const { order = "desc", limit = 9, page = 1 } = req.query;

  try {
    const recipes = await Recipe.find({})
      .sort({ "recipeRating.ratingValue": order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      recipes,
      totalRecipes,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalRecipes / limit),
    });
  } catch (error) {
    next(error);
  }
};

export const setRate = async (req, res, next) => {
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
    next(error);
  }
};
