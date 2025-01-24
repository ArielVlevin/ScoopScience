import { Ingredient } from "../models/Ingredient.js";
import { getNutrientCategory } from "../utils/ingredientUtils.js";
import { fetchIngredientsOpenFoodApi } from "../services/ingredientService.js";
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
  const ingredientID = req.params.id;
  const weight = parseFloat(req.query.weight || 100); // Default to 100g if weight is not provided

  try {
    // Fetch the ingredient by ID
    const ingredient = await Ingredient.findById(ingredientID).exec();

    if (ingredient) {
      const ingredientObject = ingredient.toObject(); // Convert to plain object
      const scaleFactor = weight / 100;

      const calculatedData = {
        ...ingredientObject, // Spread the original fields
        weight: weight,
        calories: ingredientObject.calories * scaleFactor,
        sugar: ingredientObject.sugar * scaleFactor,
        fat: ingredientObject.fat * scaleFactor,
        protein: ingredientObject.protein * scaleFactor,
        saturates: ingredientObject.saturates * scaleFactor,
      };

      res.status(200).json(calculatedData);
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

export const fetchIngredients = async (req, res, next) => {
  try {
    const {
      limit = 10,
      page = 1,
      order = "asc",
      sortBy = "name",
      category,
      minCalories,
      maxCalories,
      minSugar,
      maxSugar,
      minFat,
      maxFat,
      search,
      namesOnly = false,
      ...allergies
    } = req.query;

    const filters = {};

    if (category) filters.category = category;
    if (minCalories || maxCalories) {
      filters.calories = {};
      if (minCalories) filters.calories.$gte = parseFloat(minCalories);
      if (maxCalories) filters.calories.$lte = parseFloat(maxCalories);
    }
    if (minSugar || maxSugar) {
      filters.sugar = {};
      if (minSugar) filters.sugar.$gte = parseFloat(minSugar);
      if (maxSugar) filters.sugar.$lte = parseFloat(maxSugar);
    }
    if (minFat || maxFat) {
      filters.fat = {};
      if (minFat) filters.fat.$gte = parseFloat(minFat);
      if (maxFat) filters.fat.$lte = parseFloat(maxFat);
    }
    if (search) filters.name = { $regex: search, $options: "i" };

    // Handle allergies
    Object.entries(allergies).forEach(([key, value]) => {
      if (value === "true") filters[`allergies.${key}`] = true;
    });

    const skip = (page - 1) * parseInt(limit, 10);

    const projection = namesOnly
      ? { _id: 1, name: 1 } // If namesOnly is true, fetch only _id and name
      : {}; // Otherwise, fetch all fields

    const ingredients = await Ingredient.find(filters, projection)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .exec();

    const totalIngredients = await Ingredient.countDocuments(filters);

    res.status(200).json({
      ingredients,
      totalIngredients,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalIngredients / parseInt(limit, 10)),
    });
  } catch (error) {
    next(error);
  }
};

export const fetchIngredientsByCategory = async (req, res, next) => {
  try {
    const {
      limit = 9,
      order = "asc",
      sortBy = "name",
      namesOnly = false,
    } = req.query;

    const parsedLimit = limit === 0 ? null : parseInt(limit, 10);

    // Aggregate ingredients by category
    const ingredientsByCategory = await Ingredient.aggregate([
      { $sort: { [sortBy]: order === "asc" ? 1 : -1 } }, // Sort by the specified field
      {
        $group: {
          _id: "$category", // Group by category
          ingredients: {
            $push: namesOnly ? { _id: "$$_id", name: "$name" } : "$$ROOT",
          }, // Push the full document or just the name
        },
      },
      {
        $project: {
          _id: 1,
          ingredients: { $slice: ["$ingredients", parsedLimit] }, // Limit
        },
      },
    ]);

    res.status(200).json(ingredientsByCategory);
  } catch (error) {
    next(error);
  }
};

export const fetchIngredientCategories = async (req, res, next) => {
  try {
    const categories = await Ingredient.distinct("category");

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getIngredientsFromOpenFoodApi = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const ingredients = await fetchIngredientsOpenFoodApi(query);

    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};
