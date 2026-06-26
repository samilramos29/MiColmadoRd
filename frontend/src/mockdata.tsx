import type { Producto } from "@/producto"
import { CATEGORIAS } from "@/categoria"
export const PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Coca Cola 355ml", precio: 35, categoria: CATEGORIAS[1] },
  { id: 2, nombre: "Agua 500ml", precio: 20, categoria: CATEGORIAS[1] },
  { id: 3, nombre: "Jugo de Naranja", precio: 45, categoria: CATEGORIAS[1] },
  { id: 4, nombre: "Cerveza Presidente", precio: 55, categoria: CATEGORIAS[1] },
  { id: 5, nombre: "Pan de Molde", precio: 60, categoria: CATEGORIAS[4] },
  { id: 6, nombre: "Pan Sobao", precio: 25, categoria: CATEGORIAS[4] },
  { id: 7, nombre: "Bizcocho", precio: 40, categoria: CATEGORIAS[4] },
  { id: 8, nombre: "Leche Entera 1L", precio: 55, categoria: CATEGORIAS[3] },
  { id: 9, nombre: "Queso Blanco", precio: 80, categoria: CATEGORIAS[3] },
  { id: 10, nombre: "Yogurt Natural", precio: 50, categoria: CATEGORIAS[3] },
  { id: 11, nombre: "Arroz 1lb", precio: 30, categoria: CATEGORIAS[2] },
  { id: 12, nombre: "Frijoles 1lb", precio: 35, categoria: CATEGORIAS[2] },
  { id: 13, nombre: "Aceite 16oz", precio: 90, categoria: CATEGORIAS[2] },
  { id: 14, nombre: "Cloro 1gal", precio: 65, categoria: CATEGORIAS[5] },
  { id: 15, nombre: "Detergente 500g", precio: 45, categoria: CATEGORIAS[5] },
  { id: 16, nombre: "Jabón Líquido", precio: 55, categoria: CATEGORIAS[5] },
]
