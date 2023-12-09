interface Nutrient {
  key: string, // all lowercase + snake_case
  name: string, // display name
  quantity: Number | null,
  unit: 'g' | 'mg' | 'mcg' | 'kcal' | 'l' | 'ml'
}
