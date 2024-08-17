import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ExitModalProps = {
  isOpen: boolean;
  onSaveAndExit: () => void;
  onDiscardAndExit: () => void;
};

export function ExitRecipeModal({
  isOpen,
  onSaveAndExit,
  onDiscardAndExit,
}: ExitModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <h2 className="text-xl font-bold mb-4">Save Your Recipe?</h2>
        <p>
          Would you like to save your recipe before exiting? If not, the recipe
          will be discarded.
        </p>
        <div className="mt-6 flex justify-between">
          <Button onClick={onSaveAndExit} className="bg-primary text-white">
            Save & Exit
          </Button>
          <Button
            onClick={onDiscardAndExit}
            className="bg-secondary text-white"
          >
            Discard & Exit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
