export interface FoodItem {
  id: string;
  product_name: string;
  categories: string | null;
  ingredients_text: string;
  nutriments: Record<string, unknown>;
  total_score: number;
  allergens: string[] | null;
}

// Represents the full response from the API
export interface SearchResponse {
  foods: FoodItem[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
}
