import { Recipe } from "../models/Recipe.js";
import User from "../models/User.js";
import { aggregateAllergies } from "../utils/recipeUtils.js";

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

    const aggregatedAllergies = aggregateAllergies(
      recipeIngredient.ingredients
    );

    const photoPath = req.file
      ? `/assets/${req.file.path.split("/assets/")[1]}`
      : "/assets/recipe/default_recipe_image.jpg";

    // Generate a unique slug for the recipe
    let baseSlug = slugify(data.recipeName, { lower: true, strict: true });
    let uniqueSlug = baseSlug;

    // Check for existing slugs and ensure uniqueness
    let counter = 1;
    while (await Recipe.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newRecipeData = {
      _id: new_id,
      user_id,
      slug: uniqueSlug,

      recipeData: {
        ...data,

        photo: photoPath,
      },
      recipeRating,
      recipeIngredient: {
        ...recipeIngredient,
        allergies: aggregatedAllergies,
      },
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

export const editRecipe = async (req, res, next) => {
  const { id } = req.params;
  const recipeData = JSON.parse(req.body.recipeData);

  // Check if the user is the creator or an admin
  if (
    recipe.user_id.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    return res.status(403).json({
      message: "Access denied. You can only delete your own recipes.",
    });
  }

  const photoPath = req.file
    ? `/assets/${req.file.path.split("/assets/")[1]}`
    : null;

  try {
    const recipe = await Recipe.findById(id);
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

    // Update recipe fields
    if (photoPath) {
      recipe.recipeData = { ...recipeData, photo: photoPath };
    } else {
      recipe.recipeData = { ...recipeData };
    }

    await recipe.save();
    res.status(200).json(recipe);
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
    console.log(
      "\nRecipe deleted successfully:\nid: ",
      recipeId,
      ", name:",
      recipe.recipeData.recipeName,
      ", user_id:",
      recipe.user_id
    );
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
    if (!recipe) res.status(404).json({ message: "Recipe not found" });

    // Check if the recipe is private and the user is not the creator
    if (
      !recipe.recipeData.isPublic &&
      (!req.user || String(recipe.user_id) !== String(req.user._id))
    ) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to view this recipe.",
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const setRate = async (req, res, next) => {
  const { ratingValue } = req.body;
  const recipeId = req.params.id;

  const user_id = req.user._id;

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

export const fetchRecipes = async (req, res, next) => {
  try {
    const {
      // Default
      limit = 9,
      page = 1,
      order = "desc",
      sortBy = "createdAt",
      userId, // Optional filter by user
      recipeKind, // Optional filter by recipe kind
      minRating, // Optional filter by minimum rating
      maxRating, // Optional filter by maximum rating
      search, // Optional search by recipe name or description
    } = req.query;

    // Base filter to fetch public recipes
    const filters = {
      $or: [{ "recipeData.isPublic": true }],
    };

    // If user is signed in, include private recipes owned by the user
    if (req.user) {
      filters.$or.push({ user_id: req.user._id });
    }

    // Apply filters
    if (userId) {
      filters["user_id"] = userId;
    }

    if (recipeKind) {
      filters["recipeData.recipeKind"] = recipeKind;
    }
    if (minRating || maxRating) {
      filters["recipeRating.ratingValue"] = {};
      if (minRating)
        filters["recipeRating.ratingValue"].$gte = parseFloat(minRating);
      if (maxRating)
        filters["recipeRating.ratingValue"].$lte = parseFloat(maxRating);
    }
    if (search) {
      filters["recipeData.recipeName"] = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * parseInt(limit, 10);

    // Query the database with filters and sort options
    const recipes = await Recipe.find(filters)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate("user_id", "username")
      .exec();

    const totalRecipes = await Recipe.countDocuments(filters);

    res.status(200).json({
      recipes,
      totalRecipes,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalRecipes / parseInt(limit, 10)),
    });
  } catch (error) {
    next(error);
  }
};

/*

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


export const getRecipeSummaries = async (req, res, next) => {
  try {
    // Fetch only the fields you need: name, id, and kind
    const recipes = await Recipe.find(
      {},
      { _id: 1, "recipeData.recipeName": 1, "recipeData.recipeKind": 1 }
    );

    // Format the response for better readability if needed
    const formattedRecipes = recipes.map((recipe) => ({
      id: recipe._id,
      name: recipe.recipeData.recipeName,
      kind: recipe.recipeData.recipeKind,
    }));

    res.status(200).json(formattedRecipes);
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
      res.status(200).json([]);
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


*/
