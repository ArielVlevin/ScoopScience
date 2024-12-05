import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MoveHorizontalIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import ErrorPage from "@/pages/error";
import { useGetPaginatedRecipes } from "@/features/recipes/hooks/useGetPaginatedRecipes";
import Title from "@/components/Text/title";
import { createSwapy } from "swapy";

export default function MainControl() {
  //

  const {
    recipes,
    totalRecipes,
    isLoading: isLoadingRecipes,
    isError: isErrorRecipes,
    error: errorRecipes,
  } = useGetPaginatedRecipes({ type: "getRecipesByDate", limit: 5 });

  const containerRef = useRef(null);

  useEffect(() => {
    const swapy = createSwapy(containerRef.current, {
      animation: "none", // You can also use 'spring' or 'none'
    });

    // Optional: handle swap events
    swapy.onSwap((event) => {
      console.log("New order:", event.data.array);
    });

    // Cleanup if needed, although Swapy may not require explicit destruction
    return () => {
      // You can remove event listeners or reset any changes manually here if necessary
    };
  }, []);

  if (isErrorRecipes && errorRecipes) {
    return <ErrorPage error={errorRecipes?.message} />;
  }

  //
  return (
    <div className=" min-h-screen flex flex-col p-2">
      <Title>Recipes</Title>
      <Separator className="my-4" />

      <div className="flex gap-2 max-h-[400px] " ref={containerRef}>
        <div className=" flex flex-col flex-1 gap-2  ">
          <div className="flex-1 flex flex-col" data-swapy-slot="slot1">
            <Card className="flex-1 h-full" data-swapy-item="a">
              <CardHeader>
                <CardTitle>Recipes</CardTitle>
                <CardDescription>Recipes on the site</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {isErrorRecipes && errorRecipes ? (
                  <ErrorPage error={errorRecipes?.message} />
                ) : isLoadingRecipes ? (
                  <p>Loading...</p>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold">{totalRecipes}</span>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 flex flex-col" data-swapy-slot="slot4">
            <Card className="flex-1 h-full" data-swapy-item="d">
              <CardHeader>
                <CardTitle>Recent Recipes</CardTitle>
                <CardDescription>
                  View and manage your latest recipes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {isErrorRecipes && errorRecipes ? (
                  <ErrorPage error={errorRecipes?.message} />
                ) : isLoadingRecipes ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead id="name">Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Created at</TableHead>
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
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2  ">
          <div className=" flex-1 flex flex-col" data-swapy-slot="slot3">
            <Card className="flex-1 h-full" data-swapy-item="c">
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage your users</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">15</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 flex flex-col " data-swapy-slot="slot6">
            <Card className="flex-1 h-full" data-swapy-item="f">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>
                  View and manage your latest users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2  ">
          <div className="flex-1 flex flex-col" data-swapy-slot="slot5">
            <Card className="flex-1 h-full" data-swapy-item="e">
              <CardHeader>
                <CardTitle>Recent Ingredients</CardTitle>
                <CardDescription>
                  View and manage your latest ingredients
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Flour</TableCell>
                      <TableCell>Baking</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Butter</TableCell>
                      <TableCell>Dairy</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Flour</TableCell>
                      <TableCell>Baking</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Butter</TableCell>
                      <TableCell>Dairy</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Butter</TableCell>
                      <TableCell>Dairy</TableCell>
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 flex flex-col " data-swapy-slot="slot2">
            <Card className="flex-1 h-full" data-swapy-item="b">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>Manage your ingredients</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">72</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
