export interface ProductsResponse {
  products: ApiProduct[];
}

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
}
