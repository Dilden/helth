interface RecipeItem {
  id: Number
}

interface Recipe {
  id: Number | null,
  name: string,
  description: string,
  items: RecipeItem[]
}
