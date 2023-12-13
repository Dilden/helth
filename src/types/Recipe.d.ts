interface RecipeItem {
  id: number
}

interface Recipe {
  id?: number,
  name: string,
  description: string,
  items: RecipeItem[]
}
