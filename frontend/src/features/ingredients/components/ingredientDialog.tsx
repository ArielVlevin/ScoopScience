import { Dialog, DialogContent, DialogHeader } from "@/components/ui";
import IngredientCard from "./ingredientCard";
import { DialogTitle } from "@radix-ui/react-dialog";

interface IngredientDialogProps {
  isOpen: boolean;
  ingredientId: string;
  onClose: () => void;
}

const IngredientDialog: React.FC<IngredientDialogProps> = ({
  isOpen,
  ingredientId,
  onClose,
}) => {
  if (!isOpen || !ingredientId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden bg-gray-100">
        <DialogTitle hidden>{ingredientId}</DialogTitle>
        <IngredientCard _id={ingredientId} />
      </DialogContent>
    </Dialog>
  );
};

export default IngredientDialog;