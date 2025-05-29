export interface Shoe {
  id: number;
  name: string;
  price: number;
  images: string[];
  company: string;
  discount: number;
  description: string;
}

export interface ShoeItem extends Shoe {
  quantity: number;
}
