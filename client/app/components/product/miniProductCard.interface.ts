export interface Product {
  id: number;
  name: string;
  image?: string;
  rating?: number;
  comments?: number;
}

export interface MiniProductCardProps {
  product: Product;
}