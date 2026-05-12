export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  freeShipping: boolean;
  stock: number;
  featured?: boolean;
  offer?: boolean;
}
