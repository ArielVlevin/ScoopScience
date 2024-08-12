import User from "../models/User.js";

//add to favorites
export const addFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const recipe_id = req.params.recipe_id;

    if (!user.favorites.includes(recipe_id)) {
      user.favorites.push(recipe_id);
      await user.save();
    }

    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    next(error);
  }
};

// Remove from favorites
export const removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user_id);
    const recipe_id = req.params.recipe_id;

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== recipe_id
    );
    await user.save();

    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    next(error);
  }
};

// Get all favorite recipes
export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.status(200).json(user.favorites);
  } catch (error) {
    next(error);
  }
};
