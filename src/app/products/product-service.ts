import { inject, Injectable, signal } from '@angular/core';
import { Product } from './../products/product';
import { HttpClient } from '@angular/common/http';
import { ApiProduct, ProductsResponse } from './product-api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://dummyjson.com/products?limit=12&select=id,title,description,price,discountPercentage';

  constructor() {
    this.loadProducts();
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<ApiProduct>(`https://dummyjson.com/products/${id}`).pipe(
      map((item) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        price: item.price,
        originalPrice: Math.round((item.price / (1 - item.discountPercentage / 100)) * 100) / 100,
      })),
    );
  }

  private loadProducts(): void {
    this.http.get<ProductsResponse>(this.apiUrl).subscribe({
      next: (response) => {
        const products: Product[] = response.products.map((item) => ({
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.price,
          originalPrice: Math.round((item.price / (1 - item.discountPercentage / 100)) * 100) / 100,
        }));
        this.productList.set(products);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set('Failed to load products');
        this.loadingState.set(false);
      },
    });
  }

  private readonly productList = signal<Product[]>([]);

  readonly products = this.productList.asReadonly();

  private readonly loadingState = signal(true);
  readonly loading = this.loadingState.asReadonly();

  private readonly errorState = signal<string | null>(null);
  readonly error = this.errorState.asReadonly();
}
