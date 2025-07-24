import { products } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "./AddToCartButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="relative aspect-square h-full w-full">
                    <Image
                      src={image}
                      alt={`${product.name} - image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                       data-ai-hint={product.dataAiHint}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
        <div className="flex flex-col justify-center">
          <Badge variant="outline" className="w-fit border-accent text-accent">
            {product.category}
          </Badge>
          <h1 className="font-headline mt-4 text-4xl font-bold text-primary md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Key Features:</h3>
            <ul className="mt-2 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <p className="font-headline text-4xl font-bold text-primary">
              ₹{product.price.toFixed(0)}
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="mt-24">
        <h2 className="font-headline text-center text-3xl font-bold text-primary">
          You Might Also Like
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
