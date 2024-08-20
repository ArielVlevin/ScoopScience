import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ContinueRecipeModalProps = {
  isOpen: boolean;
  onContinue: () => void;
  onNew: () => void;
};

export function ContinueRecipeModal({
  isOpen,
  onContinue,
  onNew,
}: ContinueRecipeModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">
          Continue Your Recipe
        </DialogTitle>
        <p>
          You have an unfinished recipe. Would you like to continue where you
          left off or start a new recipe?
        </p>
        <div className="flex justify-end space-x-4 mt-4">
          <Button onClick={onNew}>Start New Recipe</Button>
          <Button onClick={onContinue} variant="secondary">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
