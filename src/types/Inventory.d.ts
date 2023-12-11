interface InventoryItem {
  id: Number | null,
  name: string,
  description: string,
  barcode: Number | null,
  nutrients: Nutrient[]
}
