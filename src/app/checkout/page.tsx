import CheckoutClient from "@/components/CheckoutClient";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card className="border-none shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Secure Checkout
          </CardTitle>
          <CardDescription className="mt-2 text-lg">
            Complete your purchase with just a few simple steps.
          </CardDescription>
        </CardHeader>
      </Card>
      <CheckoutClient />
    </div>
  );
}
