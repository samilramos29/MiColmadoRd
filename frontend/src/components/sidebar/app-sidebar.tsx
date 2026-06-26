"use client"

import * as React from "react"
import {
  Boxes,
  Command,
  CreditCard,
  Home,
  LifeBuoy,
  ReceiptText,
  Send,
  ShoppingBasket,
  Store,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Santana",
    email: "2022-0835@colrd.com",
    avatar:
      "https://imgs.search.brave.com/pD-lVXc9jsIF0EZ0LmN1wj1h45RnQ-5g-CYYtkoLNIw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/OTUxLzEzNy9zbWFs/bC9zdHlsaXNoLXNw/ZWN0YWNsZXMtZ3V5/LTNkLWF2YXRhci1j/aGFyYWN0ZXItaWxs/dXN0cmF0aW9ucy1w/bmcucG5n",
  },
  navSecondary: [
    {
      title: "Soporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navMain: [
    {
      title: "Inicio",
      url: "/shop",
      icon: Home,
      isActive: true,
    },
    {
      title: "Tienda",
      url: "/shop",
      icon: Store,
      items: [
        {
          title: "Catalogo",
          url: "/shop",
        },
        {
          title: "Carrito",
          url: "/shop",
        },
      ],
    },
    {
      title: "Ventas",
      url: "/sale",
      icon: ReceiptText,
      items: [
        {
          title: "Punto de venta",
          url: "/sale",
        },
        {
          title: "Pago rapido",
          url: "/sale",
        },
      ],
    },
    {
      title: "Pagos",
      url: "/shop",
      icon: CreditCard,
    },
  ],
  projects: [
    {
      name: "Alimentos",
      url: "/shop",
      icon: ShoppingBasket,
    },
    {
      name: "Bebidas",
      url: "/shop",
      icon: Boxes,
    },
    {
      name: "Limpieza",
      url: "/shop",
      icon: Boxes,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Mi Colmado RD</span>
                  <span className="truncate text-xs">
                    Tu Colmado En Tus Manos
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
