import { Button } from "@/components/ui/button";
import { createSwapy } from "swapy";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowRightIcon, MenuIcon, MoveHorizontalIcon } from "lucide-react";
import { ArrowLeftIcon, PlusIcon } from "@/components/icons/icon";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/class/title";
import { usePaginatedRecipes } from "@/features/recipes/hooks/usePaginatedRecipes";
import ErrorPage from "@/pages/error";
import { useEffect, useRef } from "react";

export default function RecipeControl() {
  const {
    recipes,
    page,
    totalPages,

    handleSetPage,
    isError,
    error,
  } = usePaginatedRecipes({
    type: "getRecipesByDate",
    limit: 10,
    showMore: false,
  });

  //
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      handleSetPage(newPage);
    }
  };
  //

  const containerRef = useRef(null);

  useEffect(() => {
    const swapy = createSwapy(containerRef.current, {
      animation: "dynamic", // You can also use 'spring' or 'none'
    });

    // Optional: handle swap events
    swapy.onSwap((event) => {
      console.log("New order:", event.data.array);
    });

    return () => {};
  }, []);

  if (isError && error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <>
      <Title>Recipes</Title>
      <Separator className="my-4" />

      <Tabs defaultValue="recipes">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <PlusIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="recipes">
          <Card>
            <CardHeader>
              <CardTitle>Recipes</CardTitle>
              <CardDescription>Manage your recipes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Create at</TableHead>
                    <TableHead>Ingredients</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipes.map((recipe) => (
                    <TableRow key={recipe._id}>
                      <TableCell id="name" className="font-medium">
                        {recipe.recipeData.recipeName}
                      </TableCell>
                      <TableCell>{recipe.recipeData.recipeKind}</TableCell>
                      <TableCell>
                        {String(recipe.createdAt).slice(0, 10)}
                      </TableCell>
                      <TableCell className="text-xs">
                        {recipe.recipeIngredient.ingredients
                          .map((i) => i.name)
                          .join(", ")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">More actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className=""
                      variant={i + 1 === page ? "default" : "outline"}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ingredients">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>Manage your ingredients here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Chicken</TableCell>
                    <TableCell>Protein</TableCell>
                    <TableCell>Pound</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MenuIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lettuce</TableCell>
                    <TableCell>Vegetable</TableCell>
                    <TableCell>Head</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
