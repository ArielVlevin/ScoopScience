export function aggregateAllergies(ingredients) {
  const aggregatedAllergies = {
    milk: false,
    nuts: false,
    egg: false,
    soy: false,
    wheat: false,
  };

  ingredients.forEach((ingredient) => {
    if (ingredient.allergies.milk) aggregatedAllergies.milk = true;
    if (ingredient.allergies.nuts) aggregatedAllergies.nuts = true;
    if (ingredient.allergies.egg) aggregatedAllergies.egg = true;
    if (ingredient.allergies.soy) aggregatedAllergies.soy = true;
    if (ingredient.allergies.wheat) aggregatedAllergies.wheat = true;
  });

  return aggregatedAllergies;
}
