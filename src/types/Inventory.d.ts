interface InventoryItem {
  id?: number,
  name: string,
  description: string,
  barcode: number | null,
  nutrients: Nutrient[]
}
