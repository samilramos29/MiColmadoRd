import { useMemo, useState, type ComponentType } from "react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import type { ItemCarrito } from "@/itemCarrito"
import { CATEGORIAS } from "@/categoria"
import { PRODUCTOS } from "@/mockdata"
import type { Producto } from "@/producto"
import { cn } from "@/lib/utils"
import {
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  Minus,
  Package,
  Plus,
  ReceiptText,
  Search,
  ShoppingCart,
  TrendingUp,
} from "lucide-react"

type EstadoVenta = "Pagada" | "Pendiente" | "Preparando" | "Entregada"
type MetodoPago = "Efectivo" | "Tarjeta" | "Transferencia"

type Venta = {
  id: string
  cliente: string
  estado: EstadoVenta
  metodo: MetodoPago
  total: number
  articulos: number
  hora: string
}

const VENTAS_INICIALES: Venta[] = [
  {
    id: "V-1004",
    cliente: "Mostrador",
    estado: "Pagada",
    metodo: "Efectivo",
    total: 485,
    articulos: 8,
    hora: "09:15 AM",
  },
  {
    id: "V-1003",
    cliente: "Delivery",
    estado: "Preparando",
    metodo: "Transferencia",
    total: 760,
    articulos: 11,
    hora: "08:48 AM",
  },
  {
    id: "V-1002",
    cliente: "Maria P.",
    estado: "Entregada",
    metodo: "Tarjeta",
    total: 325,
    articulos: 5,
    hora: "08:21 AM",
  },
  {
    id: "V-1001",
    cliente: "Jose R.",
    estado: "Pendiente",
    metodo: "Efectivo",
    total: 210,
    articulos: 3,
    hora: "07:56 AM",
  },
]

export default function SalesDashboard() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas")
  const [busqueda, setBusqueda] = useState("")
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [ventas, setVentas] = useState<Venta[]>(VENTAS_INICIALES)
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("Efectivo")
  const [cliente, setCliente] = useState("Mostrador")

  const productosFiltrados = PRODUCTOS.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "Todas" || producto.categoria === categoriaActiva
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    return coincideCategoria && coincideBusqueda
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
  const articulos = carrito.reduce((sum, item) => sum + item.cantidad, 0)
  const ventasCompletadas = ventas.filter(
    (venta) => venta.estado === "Pagada" || venta.estado === "Entregada"
  )
  const ingresos = ventasCompletadas.reduce(
    (sum, venta) => sum + venta.total,
    0
  )
  const enProceso = ventas.filter(
    (venta) => venta.estado === "Pendiente" || venta.estado === "Preparando"
  ).length

  const productoMasVendido = useMemo(() => {
    const conteo = carrito.reduce<Record<string, number>>((acc, item) => {
      acc[item.nombre] = (acc[item.nombre] ?? 0) + item.cantidad
      return acc
    }, {})

    const producto = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0]
    return producto?.[0] ?? "Sin productos"
  }, [carrito])

  const registrarVenta = () => {
    if (carrito.length === 0) return

    const nuevaVenta: Venta = {
      id: `V-${1001 + ventas.length}`,
      cliente: cliente.trim() || "Mostrador",
      estado: metodoPago === "Efectivo" ? "Pagada" : "Preparando",
      metodo: metodoPago,
      total,
      articulos,
      hora: new Date().toLocaleTimeString("es-DO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setVentas((prev) => [nuevaVenta, ...prev])
    setCarrito([])
    setCliente("Mostrador")
  }

  const variantEstado = (estado: EstadoVenta) => {
    if (estado === "Pagada" || estado === "Entregada") return "default"
    if (estado === "Preparando") return "secondary"
    return "outline"
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex min-h-16 shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Ventas</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="relative hidden w-full max-w-sm md:block">
            <Search className="absolute top-2 left-2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              className="pl-8"
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ResumenCard
              titulo="Ventas de hoy"
              valor={ventas.length.toString()}
              detalle="Ordenes registradas"
              icono={ReceiptText}
            />
            <ResumenCard
              titulo="Ingresos"
              valor={`RD$ ${ingresos.toFixed(2)}`}
              detalle="Pagadas y entregadas"
              icono={TrendingUp}
            />
            <ResumenCard
              titulo="En proceso"
              valor={enProceso.toString()}
              detalle="Pendientes o preparando"
              icono={Clock}
            />
            <ResumenCard
              titulo="Venta actual"
              valor={`RD$ ${total.toFixed(2)}`}
              detalle={`${articulos} articulos en carrito`}
              icono={ShoppingCart}
            />
          </div>

          <div className="mt-4 grid min-h-0 gap-4 xl:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Registrar venta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative md:hidden">
                    <Search className="absolute top-2 left-2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar producto..."
                      value={busqueda}
                      onChange={(event) => setBusqueda(event.target.value)}
                      className="pl-8"
                    />
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {CATEGORIAS.map((categoria) => (
                      <Button
                        key={categoria}
                        variant={
                          categoriaActiva === categoria ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCategoriaActiva(categoria)}
                      >
                        {categoria}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {productosFiltrados.map((producto) => (
                      <button
                        key={producto.id}
                        onClick={() => agregarAlCarrito(producto)}
                        className="flex min-h-32 flex-col justify-between rounded-lg border bg-background p-3 text-left transition-all hover:border-primary hover:shadow-sm active:scale-95"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                            <Package className="size-4" />
                          </div>
                          <Badge variant="secondary">
                            RD$ {producto.precio.toFixed(2)}
                          </Badge>
                        </div>
                        <div>
                          <p className="line-clamp-2 text-sm font-medium">
                            {producto.nombre}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {producto.categoria}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seguimiento de ventas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {ventas.map((venta) => (
                      <div
                        key={venta.id}
                        className="grid gap-3 rounded-lg border bg-background p-3 md:grid-cols-[120px_1fr_120px_120px_120px]"
                      >
                        <div>
                          <p className="text-sm font-semibold">{venta.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {venta.hora}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{venta.cliente}</p>
                          <p className="text-xs text-muted-foreground">
                            {venta.articulos} articulos
                          </p>
                        </div>
                        <Badge variant={variantEstado(venta.estado)}>
                          {venta.estado}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {venta.metodo}
                        </p>
                        <p className="text-sm font-bold">
                          RD$ {venta.total.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="xl:sticky xl:top-20 xl:max-h-[calc(100svh-6rem)]">
              <CardHeader>
                <CardTitle>Proceso de cobro</CardTitle>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-col gap-4">
                <Input
                  value={cliente}
                  onChange={(event) => setCliente(event.target.value)}
                  placeholder="Cliente o referencia"
                />

                <div className="flex-1 space-y-3 overflow-auto">
                  {carrito.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-6 text-center">
                      <ShoppingCart className="mx-auto mb-2 size-8 text-muted-foreground" />
                      <p className="text-sm font-medium">Carrito vacio</p>
                      <p className="text-xs text-muted-foreground">
                        Selecciona productos para registrar una venta.
                      </p>
                    </div>
                  ) : (
                    carrito.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border bg-background p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {item.nombre}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              RD$ {item.precio.toFixed(2)} x {item.cantidad}
                            </p>
                          </div>
                          <p className="text-sm font-bold">
                            RD$ {(item.precio * item.cantidad).toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => quitarDelCarrito(item.id)}
                          >
                            <Minus />
                          </Button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.cantidad}
                          </span>
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => agregarAlCarrito(item)}
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "Efectivo", icon: Banknote },
                    { value: "Tarjeta", icon: CreditCard },
                    { value: "Transferencia", icon: CheckCircle2 },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setMetodoPago(item.value as MetodoPago)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs transition-colors",
                        metodoPago === item.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted"
                      )}
                    >
                      <item.icon className="size-4" />
                      {item.value}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 rounded-lg bg-muted p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Producto clave
                    </span>
                    <span className="max-w-40 truncate">
                      {productoMasVendido}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Articulos</span>
                    <span>{articulos}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>RD$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={carrito.length === 0}
                  onClick={registrarVenta}
                >
                  <ReceiptText />
                  Registrar venta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ResumenCard({
  titulo,
  valor,
  detalle,
  icono: Icono,
}: {
  titulo: string
  valor: string
  detalle: string
  icono: ComponentType<{ className?: string }>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm">{titulo}</CardTitle>
        <Icono className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{valor}</p>
        <p className="text-xs text-muted-foreground">{detalle}</p>
      </CardContent>
    </Card>
  )
}
