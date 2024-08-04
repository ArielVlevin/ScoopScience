import Grid from "@/components/class/grid";
import Page from "@/components/class/page";
import { Button } from "@/components/ui/button";
//import { ResponsiveBar } from "@nivo/bar"
//import { ResponsivePie } from "@nivo/pie"
import { SVGProps, useState } from "react";
import { JSX } from "react/jsx-runtime";

import ice_cream_image from "@/assets/ice-cream-back2.jpeg";
import { useParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import NutritionTable from "../components/nutritionTable";
import BulletChart from "@/components/chart/bulletChart";
import { RecipePieChart } from "../components/pie";
import { Rating } from "@smastrom/react-rating";

export default function RecipeDetailPage() {
  const [rating, setRating] = useState(0); // TODO: delete later

  const { recipeId } = useParams<{ recipeId: string }>();

  if (isNaN(recipeId as unknown as number))
    return <ErrorPage error="Invalid Recipe ID" />;

  const { recipe, isLoading, isError, error } = useGetRecipe(
    (recipeId as string) || ""
  );

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      <div className="bg-muted  rounded-lg p-6 mb-6 hover:scale-105 duration-500 h-full items-center justify-center">
        <div className="flex justify-center text-xs font-bold uppercase mb-1  ">
          {recipe?.recipeData.recipeKind}
        </div>
        <div className="flex justify-center text-3xl font-bold ">
          {recipe?.recipeData.recipeName}
        </div>
        <div className="flex justify-center ">
          <Rating
            style={{ maxWidth: 100 }}
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="flex justify-center text-muted-foreground mb-4">
          {recipe?.recipeData.description}
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <LeafIcon className="w-5 h-5 text-green-500" />
            <span className="text-muted-foreground">Vegan</span>
          </div>
          <div className="flex items-center gap-2">
            <MilkIcon className="w-5 h-5 text-orange-500" />
            <span className="text-muted-foreground">Dairy</span>
          </div>{" "}
          <div className="flex items-center gap-2">
            <MilkIcon className="w-5 h-5 text-orange-500" />
            <span className="text-muted-foreground">Dairy</span>
          </div>{" "}
          <div className="flex items-center gap-2">
            <MilkIcon className="w-5 h-5 text-orange-500" />
            <span className="text-muted-foreground">Dairy</span>
          </div>{" "}
          <div className="flex items-center gap-2">
            <MilkIcon className="w-5 h-5 text-orange-500" />
            <span className="text-muted-foreground">Dairy</span>
          </div>
        </div>
      </div>

      <Grid mdcols={2} gap={6} className="w-full mb-8">
        <img
          src={ice_cream_image} //TODO:change to real img
          alt="Creamy Vanilla Ice Cream"
          loading="lazy"
          className="size-full rounded-lg object-cover hover:scale-105 duration-500"
        />
        <div>
          <div className="bg-muted rounded-lg p-6 mb-6 hover:scale-105 duration-500">
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>
            //TODO: change to real ingredients, crate array for every type of
            ingredient category such dairy, sugars ...
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Dairy</h3>
                <ul className="space-y-2">
                  <li>2 cups heavy cream</li>
                  <li>1 cup whole milk</li>
                  <li>3/4 cup granulated sugar</li>
                  <li>1 tablespoon vanilla extract</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Sugars</h3>
                <ul className="space-y-2">
                  <li>Pinch of salt</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Other Ingredients</h3>
                <ul className="space-y-2">
                  <li>Pinch of salt</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Sugars</h3>
                <ul className="space-y-2">
                  <li>Pinch of salt</li>
                </ul>
              </div>
            </div>
          </div>
          <Button className="w-full h-10  hover:scale-105 duration-500">
            View Ingredient Table
          </Button>
        </div>
      </Grid>

      <div className="bg-muted rounded-lg p-4 mb-6  hover:scale-105 duration-500">
        <Grid mdcols={2} gap={6} className="w-full mb-8">
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Data chart</h2>
            <BulletChart
              data={{
                title: "Total Solids",
                ranges: [100],
                measures: [70],
                markers: [30, 80],
              }}
              width={700}
              height={85}
            />
            <BulletChart
              data={{
                title: "Fat %",
                ranges: [100],
                measures: [70],
                markers: [30, 80],
              }}
              width={700}
              height={85}
            />
            <BulletChart
              data={{
                title: "Sugar %",
                ranges: [100],
                measures: [70],
                markers: [30, 80],
              }}
              width={700}
              height={85}
            />
          </div>
          <RecipePieChart />
        </Grid>
      </div>

      <Grid mdcols={2} gap={6} className="w-full mb-6  ">
        <div className="bg-muted rounded-lg p-4  hover:scale-105 duration-500">
          <h2 className="text-xl font-bold ">Nurtional Table</h2>
          <NutritionTable />
        </div>

        <div className="bg-muted rounded-lg p-6 w-full  hover:scale-105 duration-500 ">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <ol className="space-y-4">
            <li>
              <h3 className="font-medium mb-2">Prepare the Ice Cream Base</h3>
              <p className="text-muted-foreground">
                In a medium saucepan, combine the heavy cream, milk, sugar, and
                salt. Heat the mixture over medium heat, stirring occasionally,
                until the sugar has dissolved and the mixture is hot but not
                boiling.
              </p>
            </li>
            <li>
              <h3 className="font-medium mb-2">Chill the Base</h3>
              <p className="text-muted-foreground">
                Remove the saucepan from the heat and stir in the vanilla
                extract. Pour the mixture into a clean bowl and refrigerate for
                at least 2 hours, or until completely chilled.
              </p>
            </li>
            <li>
              <h3 className="font-medium mb-2">Churn the Ice Cream</h3>
              <p className="text-muted-foreground">
                Once the base is chilled, pour it into an ice cream maker and
                churn according to the manufacturer's instructions, usually
                about 20-30 minutes.
              </p>
            </li>
            <li>
              <h3 className="font-medium mb-2">Freeze and Serve</h3>
              <p className="text-muted-foreground">
                Transfer the churned ice cream to a freezer-safe container and
                freeze for at least 2 hours before serving. Scoop and enjoy!
              </p>
            </li>
          </ol>
        </div>
      </Grid>
    </Page>
  );
}

function LeafIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function MilkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2h8" />
      <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
      <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
    </svg>
  );
}

/*
add later:
             <div>
               <BarChart className="aspect-[16/9]" />
             </div>
             <div>
               <PieChart className="aspect-[16/9]" />
             </div>


             */

/*
function BarChart(props) {
 return (
   <div {...props}>
     <ResponsiveBar
       data={[
         { name: "Jan", count: 111 },
         { name: "Feb", count: 157 },
         { name: "Mar", count: 129 },
         { name: "Apr", count: 150 },
         { name: "May", count: 119 },
         { name: "Jun", count: 72 },
       ]}
       keys={["count"]}
       indexBy="name"
       margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
       padding={0.3}
       colors={["#2563eb"]}
       axisBottom={{
         tickSize: 0,
         tickPadding: 16,
       }}
       axisLeft={{
         tickSize: 0,
         tickValues: 4,
         tickPadding: 16,
       }}
       gridYValues={4}
       theme={{
         tooltip: {
           chip: {
             borderRadius: "9999px",
           },
           container: {
             fontSize: "12px",
             textTransform: "capitalize",
             borderRadius: "6px",
           },
         },
         grid: {
           line: {
             stroke: "#f3f4f6",
           },
         },
       }}
       tooltipLabel={({ id }) => `${id}`}
       enableLabel={false}
       role="application"
       ariaLabel="A bar chart showing data"
     />
   </div>
 )
}



function PieChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
 return (
   <div {...props}>
     <ResponsivePie
       data={[
         { id: "Jan", value: 111 },
         { id: "Feb", value: 157 },
         { id: "Mar", value: 129 },
         { id: "Apr", value: 150 },
         { id: "May", value: 119 },
         { id: "Jun", value: 72 },
       ]}
       sortByValue
       margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
       cornerRadius={0}
       padAngle={0}
       borderWidth={1}
       borderColor={"#ffffff"}
       enableArcLinkLabels={false}
       arcLabel={(d) => `${d.id}`}
       arcLabelsTextColor={"#ffffff"}
       arcLabelsRadiusOffset={0.65}
       colors={["#2563eb"]}
       theme={{
         labels: {
           text: {
             fontSize: "18px",
           },
         },
         tooltip: {
           chip: {
             borderRadius: "9999px",
           },
           container: {
             fontSize: "12px",
             textTransform: "capitalize",
             borderRadius: "6px",
           },
         },
       }}
       role="application"
     />
   </div>
 )
}*/
