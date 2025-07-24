"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { type Order } from "@/types";

export async function createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not create order");
  }
}
