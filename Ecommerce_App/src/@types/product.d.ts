export interface Size {
  stock: number;
  value: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
}

export interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  shortDescription: string;
}

export type ProductListItem = Product & {
  inStock: boolean;
};

export type ProductDetail = Product & {
  images: string[];
  description: string;
  sizes: Size[];
};
