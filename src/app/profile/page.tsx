
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getOrdersByUserId } from "@/services/orders";
import { type Order } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const userOrders = await getOrdersByUserId(currentUser.uid);
        setOrders(userOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, router]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">My Profile</CardTitle>
          <CardDescription>
            {currentUser?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="mb-4 text-2xl font-semibold text-primary">Order History</h2>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
                    <div>
                        <p className="font-semibold">Order ID: {order.id}</p>
                        <p className="text-sm text-muted-foreground">
                            Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <Badge variant={order.paymentMethod === 'Card' ? 'default' : 'secondary'}>
                        {order.paymentMethod.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                        {order.items.map(item => (
                            <li key={item.id} className="flex justify-between items-center text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-medium">₹{(item.price * item.quantity).toFixed(0)}</span>
                            </li>
                        ))}
                    </ul>
                    <Separator className="my-3"/>
                     <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{order.total.toFixed(0)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-16 text-center">
                <Package className="h-16 w-16 text-muted-foreground/30" />
                <p className="mt-4 text-lg text-muted-foreground">You haven't placed any orders yet.</p>
                <Button asChild className="mt-6">
                    <a href="/">Start Shopping</a>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
