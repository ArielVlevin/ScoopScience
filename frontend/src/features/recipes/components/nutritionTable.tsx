import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

export interface NutritionTableProps {
  header?: string;
}
export default function NutritionTable({ header }: NutritionTableProps) {
  return (
    <div className=" mx-auto p-4 ">
      {header ? <h1 className="text-2xl font-bold">Nutrition Table</h1> : null}
      <div className="mt-2">
        <label htmlFor="serving-size" className="block text-sm font-medium">
          Serving Size
        </label>
        <Select>
          <SelectTrigger id="serving-size" aria-label="Serving Size">
            <SelectValue placeholder="1/2 cup (about 82g)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1/2 cup (about 82g)">
              1/2 cup (about 82g)
            </SelectItem>
            <SelectItem value="1 cup (about 164g)">
              1 cup (about 164g)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm">Servings Per Container 8</p>
      <div className="border-t border-black my-2" />
      <div className="flex justify-between font-bold">
        <span>Calories 200</span>
        <span>Calories from Fat 130</span>
      </div>
      <div className="border-t border-black my-2" />
      <div className="flex justify-between font-bold">
        <span>% of Total Weight</span>
      </div>
      <div className="border-t border-black my-2" />
      <div className="flex justify-between">
        <span className="font-bold">Total Fat 14g</span>
        <span>17%</span>
      </div>
      <div className="flex justify-between pl-4">
        <span>Saturated Fat 9g</span>
        <span>11%</span>
      </div>
      <div className="flex justify-between pl-4">
        <span>Trans Fat 0g</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Cholesterol 55mg</span>
        <span>67%</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Sodium 40mg</span>
        <span>2%</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Total Carbohydrate 17g</span>
        <span>21%</span>
      </div>
      <div className="flex justify-between pl-4">
        <span>Dietary Fiber 1g</span>
        <span>1%</span>
      </div>
      <div className="flex justify-between pl-4">
        <span>Sugars 14g</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Protein 3g</span>
        <span>4%</span>
      </div>
      <div className="border-t border-black my-2" />
      <div className="flex justify-between">
        <span>Vitamin A 10%</span>
        <span>Vitamin C 0%</span>
      </div>
      <div className="flex justify-between">
        <span>Calcium 10%</span>
        <span>Iron 6%</span>
      </div>
      <div className="border-t border-black my-2" />
      <p className="text-xs">
        *Percent Daily Values are based on a 2,000 calorie diet. Your daily
        values may be higher or lower depending on your calorie needs:
      </p>
      <div className="border-t border-black my-2" />
      <div className="text-xs">
        <div className="flex justify-between">
          <span>Calories:</span>
          <span>2,000</span>
          <span>2,500</span>
        </div>
        <div className="flex justify-between">
          <span>Total Fat</span>
          <span>Less than 65g</span>
          <span>80g</span>
        </div>
        <div className="flex justify-between pl-4">
          <span>Saturated Fat</span>
          <span>Less than 20g</span>
          <span>25g</span>
        </div>
        <div className="flex justify-between">
          <span>Cholesterol</span>
          <span>Less than 300mg</span>
          <span>300mg</span>
        </div>
        <div className="flex justify-between">
          <span>Sodium</span>
          <span>Less than 2,400mg</span>
          <span>2,400mg</span>
        </div>
        <div className="flex justify-between">
          <span>Total Carbohydrate</span>
          <span>300g</span>
          <span>375g</span>
        </div>
        <div className="flex justify-between pl-4">
          <span>Dietary Fiber</span>
          <span>25g</span>
          <span>30g</span>
        </div>
      </div>
      <div className="border-t border-black my-2" />
      <p className="text-xs">
        Calories per gram:
        <br />
        Fat 9 • Carbohydrate 4 • Protein 4
      </p>
    </div>
  );
}