interface RecipeItem {
  id: Number
}

interface Recipe {
  id?: Number,
  name: string,
  description: string,
  items: RecipeItem[]
}
