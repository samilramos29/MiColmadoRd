import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useProducts, ProductCard } from "@/features/products"
import type { Product } from "@/features/products"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react"
import { useMemo, useState } from "react"

type CartItem = Product & {
  quantity: number
}

export default function Page() {
  const { products } = useProducts()
  const [cart, setCart] = useState<CartItem[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Todos")
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta")
  const [paid, setPaid] = useState(false)

  const categories = useMemo(() => {
    return ["Todos", ...new Set(products.map((product) => product.category))]
  }, [products])

  const filteredProducts = products.filter((product) => {
    const searchText = `${product.name} ${product.brand}`.toLowerCase()
    const matchSearch = searchText.includes(search.toLowerCase())
    const matchCategory = category === "Todos" || product.category === category

    return matchSearch && matchCategory
  })

  const subtotal = cart.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price
    return sum + price * item.quantity
  }, 0)
  const envio = subtotal > 0 ? 75 : 0
  const total = subtotal + envio
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: Product) => {
    setPaid(false)
    setCart((prev) => {
      const current = prev.find((item) => item.id === product.id)

      if (current) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeOne = (id: number) => {
    setCart((prev) => {
      const current = prev.find((item) => item.id === id)

      if (current && current.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }

      return prev.filter((item) => item.id !== id)
    })
  }

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const checkout = () => {
    setPaid(true)
    setCart([])
  }

  const CartResume = () => (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="font-semibold">Carrito</h2>
          <p className="text-xs text-muted-foreground">
            {cartCount} producto{cartCount === 1 ? "" : "s"} seleccionado
            {cartCount === 1 ? "" : "s"}
          </p>
        </div>
        <Badge variant="secondary">RD$ {total.toFixed(2)}</Badge>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {paid ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="font-medium">Pago registrado</p>
            <p className="text-sm text-muted-foreground">
              La orden fue procesada.
            </p>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <p className="font-medium">Tu carrito esta vacio</p>
            <p className="text-sm text-muted-foreground">
              Agrega productos para preparar la compra.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cart.map((item) => {
              const price = item.discountPrice ?? item.price

              return (
                <div
                  key={item.id}
                  className="rounded-lg border bg-background p-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-14 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        RD$ {price.toFixed(2)} x {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        RD$ {(price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Stock: {item.stock}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => removeOne(item.id)}
                      >
                        <Minus />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        disabled={item.quantity >= item.stock}
                        onClick={() => addToCart(item)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="mb-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>RD$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span>RD$ {envio.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>RD$ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {["Tarjeta", "Efectivo", "Transferencia"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs transition-colors",
                paymentMethod === method
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              )}
            >
              {method}
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={cart.length === 0}
          onClick={checkout}
        >
          <CreditCard />
          Pagar con {paymentMethod}
        </Button>
      </div>
    </div>
  )

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
                  <BreadcrumbLink href="#">Tienda</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="relative hidden w-full max-w-sm md:block">
            <Search className="absolute top-2 left-2 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar productos..."
              className="pl-8"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <ShoppingCart />
                {cartCount}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[88svh] p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Carrito</SheetTitle>
              </SheetHeader>
              <CartResume />
              <SheetFooter className="sr-only" />
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <main className="flex-1 overflow-auto p-4">
            <div className="mb-4 space-y-3">
              <div className="relative md:hidden">
                <Search className="absolute top-2 left-2 size-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar productos..."
                  className="pl-8"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((item) => (
                  <Button
                    key={item}
                    variant={category === item ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={
                    cart.find((item) => item.id === product.id)?.quantity ?? 0
                  }
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </main>

          <aside className="hidden w-96 border-l bg-card lg:block">
            <CartResume />
          </aside>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
