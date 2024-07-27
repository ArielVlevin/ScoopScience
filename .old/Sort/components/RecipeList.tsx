import React from "react";
import Grid from "@mui/material/Grid";
import { RecipeData } from "../../../src/types/recipeTypes";
import RecipeReviewCard from "../../card/old/recipeCard";
import { List, ListItem } from "@mui/material";

interface RecipeListProps {
  recipes: RecipeData[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <List sx={{ width: "100%" }}>
      {recipes.map((recipe) => (
        <ListItem key={recipe.id} sx={{ width: "100%" }}>
          <RecipeReviewCard {...recipe} />
        </ListItem>
      ))}
    </List>
  );
};

export default RecipeList;
