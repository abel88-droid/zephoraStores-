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
