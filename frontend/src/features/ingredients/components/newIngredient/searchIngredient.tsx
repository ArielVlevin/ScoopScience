import React, { useState } from "react";
import { useSearchIngredient } from "../../hooks/useSearchIngredient";
import { Separator } from "@/components/ui/separator";
import { FoodItem } from "../../types/searchInredientType";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Loader2, Search } from "lucide-react";
import Describe from "@/components/class/text";
import PageCard from "@/components/class/pageCard";

interface IngredientSearchProps {
  onSelectIngredient: (ingredient: FoodItem) => void;
  className?: string;
}

// Search Input Component
const SearchInput = ({
  query,
  setQuery,
  handleSearch,
  isLoading,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  isLoading: boolean;
}) => (
  <div className="flex space-x-2">
    <Input
      type="text"
      placeholder="Enter ingredient name.."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <Button onClick={handleSearch} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Search className="h-4 w-4" />
      )}
    </Button>
  </div>
);

// Ingredient Select Component
const IngredientSelect = ({
  data,
  selectedId,
  handleSelectChange,
}: {
  data: FoodItem[];
  selectedId: string;
  handleSelectChange: (value: string) => void;
}) => (
  <div className="mt-2">
    <Select onValueChange={handleSelectChange} value={selectedId}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an ingredient" />
      </SelectTrigger>
      <SelectContent>
        {data.map((ingredient) => (
          <SelectItem key={ingredient.id} value={ingredient.id}>
            {ingredient.product_name} - Match: {ingredient.total_score}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const IngredientSearch: React.FC<IngredientSearchProps> = ({
  onSelectIngredient,
  className,
}) => {
  const [query, setQuery] = useState("");
  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
    data,
  } = useSearchIngredient();
  const [selectedId, setSelectedId] = useState<string>("");
  const [ingredient, setIngredient] = useState<FoodItem | null>(null);

  const handleSearch = () => {
    mutate({ query });
  };

  const handleSelectChange = (value: string) => {
    setSelectedId(value);
    const selectedIngredient = data?.foods.find((food) => food.id === value);
    if (selectedIngredient) {
      setIngredient(selectedIngredient);
      onSelectIngredient(selectedIngredient);
    }
  };

  return (
    <PageCard title="Search and Load Ingredient" className={className}>
      <Describe>
        Enter keywords related to the ingredient you want, and include specific
        nutrient information if needed (e.g., “heavy cream 38% fat” or “milk
        protein 3g”).
        <br />
        Use terms like “protein,” “fat,” or “carbohydrates” to refine your
        search.
      </Describe>

      {/* Search Input */}
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Loading, Error, and Data Display */}
      {isLoading && <p className="mt-4 text-center ">Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}

      {data && (
        <>
          <Describe>
            Please select the product that best matches what you're looking for
            from the dropdown.
            <br /> Once selected, the ingredient values will automatically
            update based on your choice.
          </Describe>
          <IngredientSelect
            data={data.foods}
            selectedId={selectedId}
            handleSelectChange={handleSelectChange}
          />

          {/* Display Selected Ingredient */}
          {selectedId && (
            <>
              <p className="text-sm text-green-600 leading-relaxed mt-2">
                You selected: <b>{ingredient?.product_name}</b>
              </p>
            </>
          )}
        </>
      )}
    </PageCard>
  );
};

export default IngredientSearch;
