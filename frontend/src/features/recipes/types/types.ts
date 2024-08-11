export const typeOptions = [
  "gelato",
  "iceCream",
  "custard",
  "sorbet",
  "other",
] as const;
export type RecipeKind = (typeof typeOptions)[number]; // = 'gelato' | 'iceCream' | 'sorbet' | 'other';
