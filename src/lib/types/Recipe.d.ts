interface RecipeItem {
  id: Number
}

interface RecipeValues {
  id: Number | null,
  name: string,
  description: string,
  items: RecipeItem[]
}
