interface Nutrient {
  key: string, // all lowercase + snake_case
  name: string, // display name
  quantity: number | null,
  unit: 'g' | 'mg' | 'mcg' | 'kcal' | 'l' | 'ml'
}
