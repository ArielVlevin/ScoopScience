import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "@/components/icons/icon";
import { Row } from "@/types";

type EditWeightDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  row: Row | null;
  onSave: (newWeight: number) => void;
};

export default function EditWeightDialog({
  isOpen,
  onClose,
  row,
  onSave,
}: EditWeightDialogProps) {
  const [newWeight, setNewWeight] = useState<number>(row?.weight || 0);

  useEffect(() => {
    if (row) {
      setNewWeight(row.weight);
    }
  }, [row]);

  const handleSave = () => {
    if (newWeight <= 0) return alert("Weight must be greater than 0");
    onSave(newWeight);
    onClose();
  };

  if (!row) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Weight</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            id="weight"
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(Number(e.target.value))}
          />
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="text-muted-foreground hover:text-primary"
          >
            <CheckIcon className="w-4 h-4" />
            <span className="sr-only">Save</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
