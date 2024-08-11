export type SpecialMarks = {
  highSugar: boolean;
  subSugar: boolean;
  highFat: boolean;
  lowFat: boolean;
  vegan: boolean;
};

export const specialMarksEnum = [
  "highSugar",
  "subSugar",
  "highFat",
  "vegan",
  "withEggs",
] as const;

export type SpecialMarksArray = {
  [key in (typeof specialMarksEnum)[number]]: boolean;
};
