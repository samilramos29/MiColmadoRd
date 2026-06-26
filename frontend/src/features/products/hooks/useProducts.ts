import { productService } from "../services/product.service"

export function useProducts() {
  const products = productService.getAll()

  return {
    products,
  }
}
