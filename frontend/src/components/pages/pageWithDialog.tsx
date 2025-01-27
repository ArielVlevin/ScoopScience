import { ReactNode, useState } from "react";
import Page from "./page";

interface PageWithDialogProps<T> {
  children:
    | ReactNode
    | ((props: { openDialog: (data: T) => void }) => ReactNode);
  dialogRenderer: (props: {
    isOpen: boolean;
    data: T | null;
    onClose: () => void;
  }) => ReactNode;
  initialDialogData?: T | null;
}

export default function PageWithDialog<T>({
  children,
  dialogRenderer,
  initialDialogData = null,
}: PageWithDialogProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<T | null>(initialDialogData);

  const openDialog = (data: T) => {
    setDialogData(data);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogData(null);
    setIsDialogOpen(false);
  };

  return (
    <Page className="flex items-center justify-center">
      {/* Render children, passing openDialog if children is a function */}
      {typeof children === "function" ? children({ openDialog }) : children}

      {/* Render dialog using the provided dialogRenderer */}
      {dialogRenderer({
        isOpen: isDialogOpen,
        data: dialogData,
        onClose: closeDialog,
      })}
    </Page>
  );
}
