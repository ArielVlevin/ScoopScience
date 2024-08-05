import { Ingredient } from "../models/Ingredient.js";

const getLastIngredientID = async (category) => {
  const lastIngredient = await Ingredient.findOne({ category }).sort({
    _id: -1,
  });
  return lastIngredient ? lastIngredient._id : 0;
};

export const createIngredient = async (req, res, next) => {
  try {
    const { name, category, calories, sugar, fat, totalSolids, msnf, protein } =
      req.body;
    const newID = (await getLastIngredientID(category)) + 1;

    const newIngredient = new Ingredient({
      _id: newID,
      name,
      category,
      calories,
      sugar,
      fat,
      totalSolids,
      msnf,
      protein,
      image: "/ingredients/vanila.jpg",
    });

    await newIngredient.save();

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
      const { category, id, name } = ingredient;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ id, name });
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
