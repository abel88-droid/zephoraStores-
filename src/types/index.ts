import { type CartItem } from "@/context/CartContext";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Club' | 'National' | 'Retro';
  features: string[];
  dataAiHint: string;
}

export interface Order {
  id?: string;
  userId?: string;
  items: CartItem[];
  total: number;
  shippingDetails: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    contactNumber: string;
  };
  paymentMethod: "Card" | "CashOnDelivery" | "WhatsApp";
  createdAt: Date;
}
