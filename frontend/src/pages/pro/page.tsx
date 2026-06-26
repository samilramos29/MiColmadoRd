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
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  CheckCircle2,
  CreditCard,
  Crown,
  Headphones,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react"

const planes = [
  {
    nombre: "Free",
    precio: "$ 0",
    descripcion: "Para comprar productos del colmado sin pagar mensualidad.",
    etiqueta: "Actual",
    icon: Package,
    accion: "Seguir gratis",
    destacado: false,
    beneficios: [
      "Comprar productos disponibles",
      "Diferentes metodos de pago",
      "Seguimiento basico del pedido",
      "Soporte",
    ],
  },
  {
    nombre: "Pro",
    precio: "$ 4.99",
    descripcion:
      "Para clientes frecuentes que quieren ahorrar y recibir mas rapido.",
    etiqueta: "Mas elegido",
    icon: Crown,
    accion: "Activar Pro",
    destacado: true,
    beneficios: [
      "Delivery prioritario",
      "Ofertas exclusivas para miembros",
      "Lista de compras favorita",
      "Cupon mensual para compras grandes",
      "Soporte preferencial",
    ],
  },
  {
    nombre: "Enterprise",
    precio: "Por correo",
    descripcion:
      "Para oficinas, familias grandes o negocios que compran por volumen.",
    etiqueta: "A medida",
    icon: Users,
    accion: "Contactar",
    destacado: false,
    beneficios: [
      "Pedidos recurrentes programados",
      "Precios por volumen",
      "Direccion y contacto dedicado",
      "Facturacion mensual",
      "Atencion directa",
    ],
  },
]

export default function ProPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex min-h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Actualizar a Pro</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <section className="space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <Badge variant="secondary" className="mb-4">
                <Sparkles />
                Membresias para clientes
              </Badge>
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                  Elige como quieres comprar en Tu Colmado RD
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Planes diseñados para que comprar sea más fácil, conveniente y
                  rentable. Disfruta mayor comodidad, mejores ofertas, delivery
                  prioritario y beneficios especiales para compras grandes.
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {planes.map((plan) => (
                <Card
                  key={plan.nombre}
                  className={plan.destacado ? "ring-2 ring-primary" : ""}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
                        <plan.icon className="size-5" />
                      </div>
                      <Badge variant={plan.destacado ? "default" : "secondary"}>
                        {plan.etiqueta}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <CardTitle>{plan.nombre}</CardTitle>
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-bold">
                          {plan.precio}
                        </span>
                        {plan.nombre === "Pro" ? (
                          <span className="pb-1 text-sm text-muted-foreground">
                            / mes
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {plan.descripcion}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.beneficios.map((beneficio) => (
                        <div
                          key={beneficio}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                          <span>{beneficio}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <Button
                      className="w-full"
                      variant={plan.destacado ? "default" : "outline"}
                      size="lg"
                      asChild={plan.nombre === "Enterprise"}
                    >
                      {plan.nombre === "Enterprise" ? (
                        <a href="mailto:ventas@micolmador.com?subject=Plan%20Enterprise%20Mi%20Colmado%20RD">
                          <Mail />
                          {plan.accion}
                        </a>
                      ) : (
                        <>
                          {plan.nombre === "Pro" ? (
                            <CreditCard />
                          ) : (
                            <ShieldCheck />
                          )}
                          {plan.accion}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
