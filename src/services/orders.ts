"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy } from "firebase/firestore";
import { type Order } from "@/types";
import { generateConfirmationEmail } from "@/ai/flows/emailConfirmationFlow";

export async function createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });
    console.log("Order created with ID: ", docRef.id);
    
    // Generate email content but don't send
    try {
        await generateConfirmationEmail({
            orderId: docRef.id,
            customerName: order.shippingDetails.fullName,
            items: order.items.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
            total: order.total
        });
        console.log(`Generated email content for order ${docRef.id}`);
    } catch(emailError) {
        console.error("Failed to generate confirmation email content:", emailError);
    }

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not create order");
  }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const orders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JS Date
            } as Order;
        });

        return orders;
    } catch (e) {
        console.error("Error fetching orders: ", e);
        throw new Error("Could not fetch orders");
    }
}