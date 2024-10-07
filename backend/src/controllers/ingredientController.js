import { Ingredient } from "../models/Ingredient.js";
import { getNutrientCategory } from "../utils/ingredientUtils.js";

const getLastIngredientID = async (category) => {
  const lastIngredient = await Ingredient.findOne({ category }).sort({
    _id: -1,
  });
  return lastIngredient ? lastIngredient._id : 0;
};

export const createIngredient = async (req, res, next) => {
  try {
    const { fat, saturates, sugars, category, ...rest } = req.body;

    const fatLevel = getNutrientCategory("fat", fat);
    const saturatesLevel = getNutrientCategory("saturates", saturates);
    const sugarsLevel = getNutrientCategory("sugars", sugars);

    const newID = (await getLastIngredientID(category)) + 1;

    const newIngredient = new Ingredient({
      ...rest,
      fat,
      category,
      saturates,
      sugars,
      _id: newID,
      fatLevel,
      saturatesLevel,
      sugarsLevel,
    });

    await newIngredient.save();

    console.log("New Ingredient saved:", newIngredient);
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error("Error inserting ingredient:", error);
    next(error);
  }
};

export const getIngredient = async (req, res, next) => {
  const ingredientsID = req.params.id;
  try {
    const ingredient = await Ingredient.findById(ingredientsID).exec();

    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ message: "Ingredient not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find({});

    const ingredientsByCategory = ingredients.reduce((acc, ingredient) => {
      const { category, _id, name } = ingredient;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ _id, name });
      return acc;
    }, {});

    res.status(200).json(ingredientsByCategory);
  } catch (error) {
    next(error);
  }
};

export const getIngredientsByRecipe = async (req, res, next) => {
  const recipeName = req.params.recipe;

  // TODO:make an array of ingredient IDs based on the recipe
  // TODO: add more recipes
  // TODO: the array should be with ingredient with weight
  let ingredientIds = [51001];
  if (recipeName === "gelato") {
    ingredientIds = [51001, 52001];
  } else if (recipeName === "iceCream") {
    ingredientIds = [51001, 52001, 58001];
  } else if (recipeName === "sorbet") {
    ingredientIds = [57001, 52001, 54001];
  } else if (recipeName === "other") {
    ingredientIds = [57001, 52001, 56001];
  }

  try {
    const ingredients = await Ingredient.find({ _id: { $in: ingredientIds } });

    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};
