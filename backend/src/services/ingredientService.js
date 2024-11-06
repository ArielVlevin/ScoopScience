import axios from "axios";

export async function fetchIngredientsOpenFoodApi(query) {
  try {
    const nutrients = [
      "energy_100g",
      "proteins_100g",
      "proteins-dry-substance_100g",
      "carbohydrates_100g",
      "sugars_100g",
      "fat_100g",
      "saturated-fat_100g",
      "energy-kcal_100g",
      "energy-kj_100g",
      "lactose_100g",
      "trans-fat_100g",
    ];

    // Replace this URL with the endpoint of the other app
    const response = await axios.post("http://localhost:8000/api/products/", {
      query,
      pageSize: 10,
      pageNumber: 1,
      required_nutrients: nutrients,
      apiKey: "0f82m9FBfMOAmE4EHaARG_a0TzPiNS1cwEHIlw83FwY",
      email: "vladi@vladi.com",
    });
    //todo: delete later
    console.log("\nresponse.data:\n", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients from external source:", error);
    throw new Error("Failed to fetch ingredients from external source");
  }
}
