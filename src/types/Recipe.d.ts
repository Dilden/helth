interface RecipeItem {
  id: number | string
}

interface Recipe {
  id?: number,
  name: string,
  description: string,
  items: RecipeItem[]
}
