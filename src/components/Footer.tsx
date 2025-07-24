import { Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);


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
              <Link href="https://instagram.com/zephora.stores" target="_blank" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="https://wa.me/917907971221" target="_blank" aria-label="WhatsApp"><WhatsAppIcon /></Link>
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
