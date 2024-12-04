import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

type CardButtonsProps = {
  recipeId: number;
  type?: "recipe" | "editable" | "favorite";
};
export const CardButtons: React.FC<CardButtonsProps> = ({
  recipeId,
  type = "recipe",
}) => {
  const navigate = useNavigate();
  const goToMakePage = () => {
    navigate(`/recipes/make?id=${recipeId}`, { state: { recipe } });
  };

  const goToEditPage = () => {
    navigate(`/recipes/edit?id=${recipeId}`, { state: { recipe } });
  };

  const goToRecipePage = () => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {type === "favorite" || type === "editable" ? (
        <CustomButton color="orange" onClick={goToMakePage}>
          Make
        </CustomButton>
      ) : null}
      {type === "editable" ? (
        <CustomButton color="blue" onClick={goToEditPage}>
          Edit
        </CustomButton>
      ) : null}
      <CustomButton color="green" onClick={goToRecipePage}>
        View Recipe
      </CustomButton>
    </div>
  );
};
