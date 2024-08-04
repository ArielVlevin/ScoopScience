export type SpecialMarks = {
  highSugar: boolean;
  subSugar: boolean;
  highFat: boolean;
  vegan: boolean;
  withEggs: boolean;
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
