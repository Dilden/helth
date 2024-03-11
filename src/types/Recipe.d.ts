interface RecipeItem {
  id: number,
  servings: number
}

interface Recipe {
  id?: number,
  name: string,
  description: string,
  items: RecipeItem[]
}
