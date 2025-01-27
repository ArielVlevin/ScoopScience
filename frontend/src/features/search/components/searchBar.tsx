import { SearchIcon } from "@/components/icons/icon";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AutocompleteSection } from "../utils/autoComplete";
import { EllipsisIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { handleSelect } from "../utils/handleSelect";
import { Separator } from "@/components/ui/separator";
import { useAutocomplete } from "../hooks/useFetchSearch";
type SearchBarProps = {
  className?: string;
};
export default function SearchBar({ className }: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);

  const {
    data: autocompleteResults,
    isLoading: isFetching,
    error,
    isError,
  } = useAutocomplete(query);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  useEffect(() => {
    if (query.length <= 1) {
      setShowAutocomplete(false);
    } else {
      setShowAutocomplete(true);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      )
        setShowAutocomplete(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn(className, "relative")} ref={searchRef}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground">
        <SearchIcon className="size-4 text-primary justify-center" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-10 rounded-full bg-muted pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {showAutocomplete && (
        <div className="flex justify-center">
          <div className="absolute w-11/12 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-50">
            <div className="p-2">
              {isFetching ? (
                <div>Loading...</div>
              ) : isError && error ? (
                <div>Error: {error.message}</div>
              ) : (
                <>
                  <AutocompleteSection
                    title="Recipes"
                    items={autocompleteResults.recipes}
                    onSelect={(recipe) =>
                      handleSelect("recipe", recipe, navigate)
                    }
                    label="reci/"
                    iconClassName="text-pink-800"
                  />
                  <AutocompleteSection
                    title="Users"
                    items={autocompleteResults.users}
                    onSelect={(user) => handleSelect("user", user, navigate)}
                    label="user/"
                    iconClassName="text-green-800"
                  />
                  <AutocompleteSection
                    title="Ingredients"
                    items={autocompleteResults.ingredients}
                    onSelect={(ingredient) =>
                      handleSelect("ingredient", ingredient, navigate)
                    }
                    label="ingr/"
                    iconClassName="text-orange-800"
                  />
                  <ul>
                    <Separator />

                    <li
                      onClick={() => navigate(`/search/${query}`)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <div className="flex gap-2">
                        <EllipsisIcon className="size-7 align-self-center" />
                        <div>
                          <a className="font-bold">more of {query}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
