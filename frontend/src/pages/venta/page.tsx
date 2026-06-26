import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { ItemCarrito } from "@/itemCarrito"
import { PRODUCTOS } from "@/mockdata"
import type { Producto } from "@/producto"
import { CATEGORIAS } from "@/categoria"

export default function VentaPage() {
  const navigate = useNavigate()
  const [categoriaActiva, setCategoriaActiva] = useState("Todas")
  const [busqueda, setBusqueda] = useState("")
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])

  const productosFiltrados = PRODUCTOS.filter((p) => {
    if (categoriaActiva !== "Todas" && p.categoria !== categoriaActiva)
      return false
    if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
      return false
    return true
  })

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const quitarDelCarrito = (id: number) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === id)
      if (existente && existente.cantidad > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
      }
      return prev.filter((item) => item.id !== id)
    })
  }

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  )

  const cerrarSesion = () => {
    navigate("/login")
  }

  return (
    <div className="flex h-svh flex-col bg-muted/30">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-card px-6 py-3">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Mi Colmado RD</h1>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="h-8 w-64"
          />
          <Button variant="ghost" onClick={cerrarSesion}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Categorías */}
        <aside className="flex w-48 flex-col gap-1 border-r bg-card p-3">
          <h2 className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
            Categorías
          </h2>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
                categoriaActiva === cat
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* Grid de productos */}
        <main className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {productosFiltrados.map((producto) => (
              <button
                key={producto.id}
                onClick={() => agregarAlCarrito(producto)}
                className="flex flex-col items-center gap-1 rounded-xl border bg-card p-3 text-center transition-all hover:border-primary hover:shadow-sm active:scale-95"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-2xl">
                  📦
                </div>
                <span className="line-clamp-2 text-xs leading-tight font-medium">
                  {producto.nombre}
                </span>
                <span className="text-sm font-bold text-primary">
                  ${producto.precio.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </main>

        {/* Carrito */}
        <aside className="flex w-80 flex-col border-l bg-card">
          <div className="border-b p-4">
            <h2 className="font-semibold">Carrito</h2>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {carrito.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                Selecciona un producto
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${item.precio.toFixed(2)} x {item.cantidad}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm font-bold">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => agregarAlCarrito(item)}
                          className="flex h-5 w-5 items-center justify-center rounded bg-muted text-xs hover:bg-muted/80"
                        >
                          +
                        </button>
                        <button
                          onClick={() => quitarDelCarrito(item.id)}
                          className="flex h-5 w-5 items-center justify-center rounded bg-muted text-xs hover:bg-muted/80"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="mb-3 flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              disabled={carrito.length === 0}
            >
              Cobrar (${total.toFixed(2)})
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
