export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Skincare' | 'Makeup' | 'Fragrance';
  features: string[];
  dataAiHint: string;
}
