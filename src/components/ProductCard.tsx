"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card className="h-full w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
        <CardContent className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
          </div>
        </CardContent>
        <div className="p-4">
            <p className="text-sm font-medium text-accent">{product.category}</p>
            <CardTitle className="mt-1 line-clamp-2 h-14 text-lg font-headline font-semibold">
              {product.name}
            </CardTitle>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xl font-bold text-primary">₹{product.price.toFixed(0)}</p>
              <Button
                onClick={handleAddToCart}
                size="icon"
                className="bg-accent text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
        </div>
      </Card>
    </Link>
  );
}
