import Box from "@/components/class/box";
import { Recipe } from "@/types";

type RecipeInstructionsProps = {
  recipe: Recipe;
};
export default function RecipeInstructions({
  recipe,
}: RecipeInstructionsProps) {
  return (
    <Box>
      <h2 className="text-xl font-bold mb-4">Instructions</h2>
      <ol className="space-y-4">
        <li>
          <h3 className="font-medium mb-2">Prepare the Ice Cream Base</h3>
          <p className="text-muted-foreground">
            In a medium saucepan, combine the heavy cream, milk, sugar, and
            salt. Heat the mixture over medium heat, stirring occasionally,
            until the sugar has dissolved and the mixture is hot but not
            boiling.
          </p>
        </li>
        <li>
          <h3 className="font-medium mb-2">Chill the Base</h3>
          <p className="text-muted-foreground">
            Remove the saucepan from the heat and stir in the vanilla extract.
            Pour the mixture into a clean bowl and refrigerate for at least 2
            hours, or until completely chilled.
          </p>
        </li>
        <li>
          <h3 className="font-medium mb-2">Churn the Ice Cream</h3>
          <p className="text-muted-foreground">
            Once the base is chilled, pour it into an ice cream maker and churn
            according to the manufacturer's instructions, usually about 20-30
            minutes.
          </p>
        </li>
        <li>
          <h3 className="font-medium mb-2">Freeze and Serve</h3>
          <p className="text-muted-foreground">
            Transfer the churned ice cream to a freezer-safe container and
            freeze for at least 2 hours before serving. Scoop and enjoy!
          </p>
        </li>
      </ol>
    </Box>
  );
}
