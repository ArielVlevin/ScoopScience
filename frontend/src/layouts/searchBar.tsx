import * as React from "react";
import { useEffect, useRef, useState } from "react";
import api from "@/config/api";
import { Ingredient, Recipe } from "@/types";
import { User } from "@/auth/types/userTypes";
import { cn } from "@/utils/cn";
import { SearchIcon } from "@/components/icons/icon";
import { CircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SearchBarProps = {
  className?: string;
};
export default function SearchBar({ className }: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchRef = useRef(null);

  const [results, setResults] = useState<{
    recipes: Recipe[];
    users: User[];
    ingredients: Ingredient[];
  }>({
    recipes: [],
    users: [],
    ingredients: [],
  });

  const [autocompleteResults, setAutocompleteResults] = useState<{
    recipes: Recipe[];
    users: User[];
    ingredients: Ingredient[];
  }>({
    recipes: [],
    users: [],
    ingredients: [],
  });

  const [showAutocomplete, setShowAutocomplete] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      api
        .get(`/search?search=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error("Error performing search:", error);
        });
    } else {
      setResults({ recipes: [], users: [], ingredients: [] });
    }
  }, [query]);

  // Perform autocomplete when query changes
  useEffect(() => {
    if (query.length > 1) {
      api
        .get(`/search/autocomplete?q=${query}`)
        .then((response) => {
          setAutocompleteResults(response.data);
          setShowAutocomplete(true);
        })
        .catch((error) => {
          console.error("Error performing autocomplete:", error);
        });
    } else {
      setAutocompleteResults({ recipes: [], users: [], ingredients: [] });
      setShowAutocomplete(false);
    }
  }, [query]);

  const handleSelectUser = (user: User) => {
    console.log("selected user:", user);
    setQuery(user.userName);
    setShowAutocomplete(false);
  };
  const handleSelectRecipe = (recipe: Recipe) => {
    console.log("selected recipe:", recipe);
    navigate(`/recipes/${recipe._id}`);
    setShowAutocomplete(false);
  };

  const handleSelectIngredient = (ingr: Ingredient) => {
    console.log("Selected ingredient:", ingr);
    navigate(`/ingredients/${ingr._id}`);
    setShowAutocomplete(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setShowAutocomplete(false);
    }
  };

  useEffect(() => {
    //todo:: fix that:
    /*        !searchRef.current.contains(event.target as Node)*/

    const handleClickOutside = () => {
      if (searchRef.current) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn(className, "relative")} ref={searchRef}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground ">
        <SearchIcon className="size-4 text-primary justify-center" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="w-full h-10  rounded-full bg-muted pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {showAutocomplete && (
        <div className=" flex justify-center	 ">
          <div className="absolute w-11/12 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-50 	 ">
            <div className="p-2">
              {autocompleteResults.recipes.length > 0 && (
                <div>
                  <h4 className="font-bold mb-1">Recipes:</h4>
                  <ul>
                    {autocompleteResults.recipes.map((recipe) => (
                      <li
                        key={recipe._id}
                        onClick={() => handleSelectRecipe(recipe)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        <div className="flex gap-2">
                          <CircleIcon className="size-8 text-pink-800 align-self-center" />
                          <div>
                            <a className="text-sm text-pink-800">reci/</a>
                            <a className="font-bold">
                              {recipe.recipeData.recipeName}
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {autocompleteResults.users.length > 0 && (
                <div>
                  <h4 className="font-bold mt-2 mb-1">Users:</h4>
                  <ul>
                    {autocompleteResults.users.map((user) => (
                      <li
                        key={user._id}
                        onClick={() => handleSelectUser(user)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        <div className="flex gap-2">
                          <CircleIcon className="size-8 text-green-800 align-self-center" />
                          <div>
                            <a className="text-sm text-green-800 font-bold">
                              user/
                            </a>
                            <a className="font-bold">{user.userName}</a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {autocompleteResults.ingredients.length > 0 && (
                <div>
                  <h4 className="font-bold mt-2 mb-1">Ingredients:</h4>
                  <ul>
                    {autocompleteResults.ingredients.map((ingredient) => (
                      <li
                        key={ingredient._id}
                        onClick={() => handleSelectIngredient(ingredient)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        <div className="flex gap-2">
                          <CircleIcon className="size-8 text-orange-800 align-self-center" />
                          <div>
                            <a className="text-sm text-orange-800 ">ingr/</a>
                            <a className="font-bold">{ingredient.name}</a>{" "}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <ul>
                  <li
                    onClick={() => alert("fix that " + results.ingredients)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex gap-2">
                      <CircleIcon className="size-8 text-orange-800 align-self-center" />
                      <div>
                        <a className="font-bold">more of {query}...</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
