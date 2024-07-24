
import {  useState } from "react"
import { Button } from "~/components/ui/button"
import { cardsInfo, RecipeCard } from "./card"




export default function RecipeCardsDisplay() {

  const [itemsPerPage, setItemsPerPage] = useState(9)


  const handleLoadMore = () => {
   setItemsPerPage(itemsPerPage + 6)
  }


  const items:cardsInfo = Array.from({ length: itemsPerPage }, (_, index) => ({
    id: index,
    title: `Ice Cream ${index + 1}`,
    description: "Enjoy a refreshing and delicious ice cream treat on a hot summer day.",
    rating: 5.0,
    isLiked: false,

    marks: [
      { isActive: true, name: "high Sugar" },
      { isActive: false, name: "high Fat" },
      { isActive: true, name: "high Calories" },
      { isActive: false, name: "Vegan" },
      { isActive: true, name: "eggs" },
      { isActive: true, name: "stabilizer" },
   ]
      
  }))

  const startIndex = 0
  const endIndex = startIndex + itemsPerPage
  const displayedItems = items.slice(startIndex, endIndex)


  return (
    <div className="container mx-auto px-4 py-12">

      <p className="text-sm text-muted-foreground  mb-4 text-center" >18 recipes found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedItems.map((item) => (
          <RecipeCard key={item.id} {...item} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
      
    </div>
  )
}


