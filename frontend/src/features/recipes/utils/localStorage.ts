import { RecipeFormState } from "@/types";

export function saveToLocalStorage(KEY: string, data: RecipeFormState) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadFromLocalStorage(KEY: string): RecipeFormState | null {
  const storedData = localStorage.getItem(KEY);
  return storedData ? JSON.parse(storedData) : null;
}

export function clearLocalStorage(KEY: string) {
  localStorage.removeItem(KEY);
}
