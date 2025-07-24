"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CreditCard, ShoppingBag, Truck, CheckCircle, Loader2, MessageCircle, TruckIcon } from "lucide-react";
import { createOrder } from "@/services/orders";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Review Cart", icon: ShoppingBag },
  { id: 2, name: "Shipping", icon: Truck },
  { id: 3, name: "Payment", icon: CreditCard },
];

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  country: z.string().min(2, "Country is required"),
  contactNumber: z.string().min(10, "Valid contact number is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;
type PaymentMethod = "Card" | "CashOnDelivery" | "WhatsApp";


export default function CheckoutClient() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });
  
  const handleProceedToShipping = () => {
    if (!currentUser) {
      toast({
        title: "Please Login",
        description: "You need to be logged in to proceed with checkout.",
        variant: "destructive"
      });
      router.push('/login');
    } else {
      setStep(2);
    }
  }

  const onShippingSubmit: SubmitHandler<ShippingFormData> = (data) => {
    setShippingInfo(data);
    setStep(3);
  };
  
  const handleFinalizeOrder = async () => {
    if (!shippingInfo) return;

    setIsProcessing(true);
    
    try {
      if (paymentMethod === "WhatsApp") {
         const message = `I'd like to place an order with the following items:\n\n${cartItems.map(item => `${item.name} (x${item.quantity})`).join('\n')}\n\nTotal: $${cartTotal.toFixed(2)}`;
         const whatsappUrl = `https://wa.me/917907971221?text=${encodeURIComponent(message)}`;
         window.open(whatsappUrl, '_blank');
         clearCart();
         setStep(4);
      } else {
        await createOrder({
          items: cartItems,
          total: cartTotal,
          shippingDetails: shippingInfo,
          paymentMethod: paymentMethod,
          userId: currentUser?.uid
        });
        
        clearCart();
        setStep(4);
      }
    } catch (error) {
      console.error("Failed to process order:", error);
      // Here you could show an error toast to the user
    } finally {
      setIsProcessing(false);
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFinalizeOrder();
  }

  if (step === 4) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
            <h2 className="mt-6 font-headline text-3xl font-bold text-primary">Thank You!</h2>
            <p className="mt-2 text-muted-foreground">Your order has been placed successfully.</p>
            <p className="mt-1 text-sm text-muted-foreground">A confirmation email has been sent.</p>
            <Button asChild className="mt-8">
              <a href="/">Continue Shopping</a>
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-8 flex items-center justify-center">
        {steps.map((s, index) => (
          <>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                  step >= s.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                }`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <p className={`text-sm font-medium ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}>{s.name}</p>
            </div>
            {index < steps.length - 1 && <div className={`h-1 flex-1 ${step > s.id ? 'bg-primary' : 'bg-border'} mx-4 mb-8`}></div>}
          </>
        ))}
      </div>

      {step > 1 && (
        <Button variant="ghost" onClick={() => setStep(step - 1)} className="mb-4" disabled={isProcessing}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      )}

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 py-4">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md" data-ai-hint={item.dataAiHint} />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, parseInt(e.target.value, 10))}
                    className="h-9 w-16 text-center"
                    aria-label={`Quantity for ${item.name}`}
                  />
                  <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </div>
              </div>
            ))}
            <Separator className="my-4"/>
            <div className="text-right font-bold text-xl">
              Total: ${cartTotal.toFixed(2)}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleProceedToShipping} className="ml-auto w-full md:w-auto" disabled={cartItems.length === 0}>Proceed to Shipping</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
          <form onSubmit={handleSubmit(onShippingSubmit)}>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("fullName")} />
                {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
              </div>
               <div>
                <Label htmlFor="contactNumber">Contact No.</Label>
                <Input id="contactNumber" {...register("contactNumber")} />
                 {errors.contactNumber && <p className="text-sm text-destructive mt-1">{errors.contactNumber.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("address")} />
                 {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} />
                 {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input id="zipCode" {...register("zipCode")} />
                 {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>}
              </div>
               <div className="md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...register("country")} />
                 {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto w-full md:w-auto">Proceed to Payment</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)} className="space-y-4">
              <Label
                htmlFor="card"
                className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${paymentMethod === 'Card' ? 'border-primary' : ''}`}
              >
                <RadioGroupItem value="Card" id="card" />
                 <CreditCard className="h-6 w-6" />
                <div className="flex-1">
                  <p className="font-semibold">Credit/Debit Card</p>
                  <p className="text-sm text-muted-foreground">Pay securely with your card.</p>
                </div>
              </Label>
              <Label
                htmlFor="cod"
                className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${paymentMethod === 'CashOnDelivery' ? 'border-primary' : ''}`}
              >
                <RadioGroupItem value="CashOnDelivery" id="cod" />
                 <TruckIcon className="h-6 w-6" />
                <div className="flex-1">
                   <p className="font-semibold">Cash on Delivery</p>
                   <p className="text-sm text-muted-foreground">Pay when your order arrives.</p>
                </div>
              </Label>
              <Label
                htmlFor="whatsapp"
                className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${paymentMethod === 'WhatsApp' ? 'border-primary' : ''}`}
              >
                <RadioGroupItem value="WhatsApp" id="whatsapp" />
                 <MessageCircle className="h-6 w-6" />
                <div className="flex-1">
                   <p className="font-semibold">DM on WhatsApp</p>
                   <p className="text-sm text-muted-foreground">Finalize your order via chat.</p>
                </div>
              </Label>
            </RadioGroup>
            
            {paymentMethod === "Card" && (
              <form onSubmit={handlePaymentSubmit} className="mt-6 space-y-4 border-t pt-6">
                 <div>
                   <Label htmlFor="cardNumber">Card Number</Label>
                   <Input id="cardNumber" placeholder="0000 0000 0000 0000" disabled={isProcessing}/>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="expiryDate">Expiry Date</Label>
                     <Input id="expiryDate" placeholder="MM/YY" disabled={isProcessing}/>
                   </div>
                   <div>
                     <Label htmlFor="cvc">CVC</Label>
                     <Input id="cvc" placeholder="123" disabled={isProcessing}/>
                   </div>
                 </div>
              </form>
            )}

          </CardContent>
          <CardFooter>
            <Button onClick={handleFinalizeOrder} className="ml-auto w-full md:w-auto" disabled={isProcessing}>
              {isProcessing ? <Loader2 className="animate-spin" /> : 
                paymentMethod === "Card" ? `Pay $${cartTotal.toFixed(2)}` : "Place Order"
              }
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
