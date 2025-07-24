"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";

const navLinks = [
  { href: "/#skincare", label: "Skincare" },
  { href: "/#makeup", label: "Makeup" },
  { href: "/#fragrance", label: "Fragrance" },
];

export default function Header() {
  const { cartItems, cartCount, removeFromCart, cartTotal } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-headline text-2xl font-bold text-primary">
              Zephora Stores
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {/* These would ideally link to filtered category pages or sections */}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-accent" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-md">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <Separator className="my-2" />
              {cartItems.length > 0 ? (
                <>
                  <div className="flex-1 overflow-y-auto pr-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-md object-cover"
                          data-ai-hint={item.dataAiHint}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-4">
                    <div className="flex justify-between font-semibold">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <SheetClose asChild>
                       <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/checkout">Proceed to Checkout</Link>
                       </Button>
                    </SheetClose>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                   <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
                   <p className="text-muted-foreground">Your cart is empty.</p>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Mobile menu */}
          <div className="md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                   <Link href="/" className="flex items-center gap-2 mb-8">
                     <span className="font-headline text-2xl font-bold text-primary">Zephora Stores</span>
                   </Link>
                  <nav className="flex flex-col gap-4">
                    {/* Add links to categories or other pages here */}
                  </nav>
                </SheetContent>
              </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
