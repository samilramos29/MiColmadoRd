import { products } from "../data/products.mock"

export const productService = {
  getAll() {
    return products
  },

  getById(id: number) {
    return products.find((p) => p.id === id)
  },
}
