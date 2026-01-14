// Product type definitions
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: 'Mishti' | 'Desserts' | 'Pithas';
}

export type ProductCategory = Product['category'];
