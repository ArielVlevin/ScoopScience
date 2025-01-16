import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageBox from "@/components/pages/pageBox";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState("1");

  const ingredients = {
    "1": {
      "Heavy Cream": "500ml",
      "Vanilla Extract": "1 tsp",
      Sugar: "150g",
      Salt: "1/4 tsp",
    },
    "2": {
      "Heavy Cream": "1L",
      "Vanilla Extract": "2 tsp",
      Sugar: "300g",
      Salt: "1/2 tsp",
    },
    "3": {
      "Heavy Cream": "1.5L",
      "Vanilla Extract": "3 tsp",
      Sugar: "450g",
      Salt: "3/4 tsp",
    },
  };

  return (
    <PageBox className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Choose Quantity</h2>
      <Select onValueChange={setQuantity} defaultValue="1">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select quantity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Liter</SelectItem>
          <SelectItem value="2">2 Liters</SelectItem>
          <SelectItem value="3">3 Liters</SelectItem>
        </SelectContent>
      </Select>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">
          Ingredients for {quantity} Liter(s):
        </h3>
        <ul className="list-disc list-inside">
          {Object.entries(ingredients[quantity]).map(([ingredient, amount]) => (
            <li key={ingredient}>
              {ingredient}: {amount}
            </li>
          ))}
        </ul>
      </div>
    </PageBox>
  );
};

export default QuantitySelector;
