export function getNutrientCategory(nutrient, value) {
  switch (nutrient) {
    case "fat":
      if (value <= 3) return "Low";
      if (value <= 17.5) return "Medium";
      return "High";
    case "saturates":
      if (value <= 1.5) return "Low";
      if (value <= 5) return "Medium";
      return "High";
    case "sugars":
      if (value <= 5) return "Low";
      if (value <= 22.5) return "Medium";
      return "High";
    default:
      return "Unknown";
  }
}
