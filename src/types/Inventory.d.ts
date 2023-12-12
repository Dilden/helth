interface InventoryItem {
  id?: Number,
  name: string,
  description: string,
  barcode: Number | null,
  nutrients: Nutrient[]
}
