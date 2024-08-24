import { useParams } from "react-router-dom";

import IngredientCard from "../components/ingredientCard";

const IngredientDetailPage = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();

  return <IngredientCard _id={ingredientId!} />;
};

export default IngredientDetailPage;
