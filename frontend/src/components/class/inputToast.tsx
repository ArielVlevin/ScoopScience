import { toast } from "../ui/use-toast";

interface RequiredLabelProps {
  description: string;
}

const invalidInputToast = ({ description }: RequiredLabelProps) => {
  return toast({
    variant: "destructive",
    title: "Invalid input",
    description: description,
  });
};

export default invalidInputToast;
