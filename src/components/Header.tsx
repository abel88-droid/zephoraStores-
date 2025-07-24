"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, User, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  const { cartItems, cartCount, removeFromCart, cartTotal } = useCart();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };
  
  const getInitials = (email: string | null | undefined) => {
    if (!email) return "?";
    return email.substring(0, 2).toUpperCase();
  };


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
                          src={item.images[0]}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-md object-cover"
                          data-ai-hint={item.dataAiHint}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price.toFixed(0)} x {item.quantity}
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
                      <span>₹{cartTotal.toFixed(0)}</span>
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

          {currentUser ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || ''} />
                    <AvatarFallback>{getInitials(currentUser.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                   <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild variant="ghost" size="sm">
               <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
               </Link>
            </Button>
          )}


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
