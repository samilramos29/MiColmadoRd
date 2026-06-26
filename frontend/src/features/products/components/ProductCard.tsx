import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Product } from "../types/product.interface"

interface Props {
  product: Product
  quantity?: number
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, quantity = 0, onAddToCart }: Props) {
  const price = product.discountPrice ?? product.price

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 aspect-video bg-black/20" />
      <img
        src={product.image}
        alt={product.name}
        className="relative z-20 aspect-video w-full object-cover brightness-90 dark:brightness-75"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">RD$ {price.toFixed(2)}</Badge>
        </CardAction>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{product.brand}</span>
        <span>{product.stock} disponibles</span>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full" onClick={() => onAddToCart?.(product)}>
          {quantity > 0 ? `Agregar otro (${quantity})` : "Agregar al carrito"}
        </Button>
      </CardFooter>
    </Card>
  )
}
