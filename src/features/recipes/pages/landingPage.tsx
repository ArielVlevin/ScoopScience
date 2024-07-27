/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PlkVGQs0ObK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RecipeKind } from "@/types";
import { ArrowLeftIcon } from "@/components/icons/icon";
import { Link } from "react-router-dom";

type Flavor = {
  name: string;
  image: string;
};

type Flavors = {
  [key in RecipeKind]?: Flavor[];
};
export default function LandingPage() {
  const [iceCreamType, setIceCreamType] = useState<RecipeKind | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const flavors: Flavors = {
    gelato: [
      { name: "Pistachio", image: "/pistachio.jpg" },
      { name: "Stracciatella", image: "/stracciatella.jpg" },
      { name: "Hazelnut", image: "/hazelnut.jpg" },
      { name: "Chocolate", image: "/chocolate.jpg" },
      { name: "Strawberry", image: "/strawberry.jpg" },
      { name: "Vanilla", image: "/vanilla.jpg" },
    ],
    custard: [
      { name: "Vanilla", image: "/vanilla.jpg" },
      { name: "Chocolate", image: "/chocolate.jpg" },
      { name: "Caramel", image: "/caramel.jpg" },
      { name: "Lemon", image: "/lemon.jpg" },
      { name: "Coconut", image: "/coconut.jpg" },
      { name: "Coffee", image: "/coffee.jpg" },
    ],
    sorbet: [
      { name: "Lemon", image: "/lemon.jpg" },
      { name: "Raspberry", image: "/raspberry.jpg" },
      { name: "Mango", image: "/mango.jpg" },
      { name: "Watermelon", image: "/watermelon.jpg" },
      { name: "Grapefruit", image: "/grapefruit.jpg" },
      { name: "Blackberry", image: "/blackberry.jpg" },
    ],
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary to-primary-foreground">
      {!iceCreamType && (
        <div className="bg-background p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">
            What type of ice cream would you like to make?
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <Button
              onClick={() => setIceCreamType("gelato")}
              className="btn btn-primary"
            >
              Gelato
            </Button>
            <Button
              onClick={() => setIceCreamType("custard")}
              className="btn btn-primary"
            >
              Custard
            </Button>
            <Button
              onClick={() => setIceCreamType("sorbet")}
              className="btn btn-primary"
            >
              Sorbet
            </Button>
          </div>
        </div>
      )}
      {iceCreamType && (
        <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setIceCreamType(null)}
              className="btn btn-primary"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold">
              Choose your {iceCreamType} flavor
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {flavors[iceCreamType]?.map((flavor) => (
              <div
                key={flavor.name}
                className={`bg-muted p-4 rounded-lg shadow-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                  selectedFlavor === flavor.name
                    ? "border-2 border-primary"
                    : ""
                }`}
                onClick={() => setSelectedFlavor(flavor.name)}
              >
                <img
                  src="/placeholder.svg"
                  alt={flavor.name}
                  width={200}
                  height={200}
                  className="rounded-lg mb-2"
                />
                <h3 className="text-xl font-bold">{flavor.name}</h3>
              </div>
            ))}
          </div>
          {selectedFlavor && (
            <div className="mt-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">
                You selected {selectedFlavor} {iceCreamType}!
              </h2>
              <Link
                to="../recipes/new"
                state={{ type: iceCreamType, flavor: selectedFlavor }}
                className="btn btn-primary"
              >
                Create Recipe
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
