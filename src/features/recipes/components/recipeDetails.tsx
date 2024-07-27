import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function RecipeDetails() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Ice Cream Recipe</CardTitle>
        <CardDescription>
          Share your homemade ice cream creations.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Recipe Name</Label>
            <Input id="name" placeholder="Enter recipe name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image Upload</Label>
            <Input id="image" type="file" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Briefly describe your ice cream recipe"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="instructions">Step-by-Step Instructions</Label>
          <Textarea
            id="instructions"
            placeholder="Provide detailed preparation steps"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="cooking-time">Cooking Time</Label>
            <Input
              id="cooking-time"
              type="number"
              placeholder="Total time (minutes)"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="prep-time">Preparation Time</Label>
            <Input
              id="prep-time"
              type="number"
              placeholder="Prep time (minutes)"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Image Upload</Label>
          <Input id="image" type="file" />
          <div className="text-sm text-muted-foreground">
            Upload an image of your finished ice cream or we can generate a
            preview for you.
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
