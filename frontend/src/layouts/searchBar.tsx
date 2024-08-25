import * as React from "react";
import { useEffect, useRef, useState } from "react";
import api from "@/config/api";
import { Ingredient, Recipe } from "@/types";
import { User } from "@/auth/types/userTypes";

export default function SearchBar() {
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

  const handleSelect = (item) => {
    setQuery(item.name || item.recipeName || item.userName);
    setShowAutocomplete(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setShowAutocomplete(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative " ref={searchRef}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />

      {showAutocomplete && (
        <div className="absolute w-full bg-white border border-gray-300 rounded mt-1 shadow-lg z-50">
          <div className="p-2">
            {autocompleteResults.recipes.length > 0 && (
              <div>
                <h4 className="font-bold mb-1">Recipes:</h4>
                <ul>
                  {autocompleteResults.recipes.map((recipe) => (
                    <li
                      key={recipe._id}
                      onClick={() => handleSelect(recipe)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {recipe.recipeData.recipeName}
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
                      onClick={() => handleSelect(user)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {user.userName}
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
                      onClick={() => handleSelect(ingredient)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
