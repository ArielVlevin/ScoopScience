import AddIngredientForm from "./newIngredients";

export default function UserIngredients() {
  return (
    <div className="container mx-auto flex items-center justify-center w-full">
      <div className="gap-6 p-6 mt-6 w-full ">
        <AddIngredientForm />
      </div>
    </div>
  );
}
