import { Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <h3 className="font-headline text-lg font-bold text-primary">Zephora Stores</h3>
            <p className="mt-2 text-sm text-muted-foreground">Not just jerseys. A movement.</p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-1">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/checkout" className="text-sm text-muted-foreground hover:text-primary">Checkout</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="mt-2 flex justify-center gap-4 md:justify-start">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zephora Stores. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
