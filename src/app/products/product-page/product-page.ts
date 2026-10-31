import { CartService } from './../../cart/cart-service';
import { ProductService } from './../product-service';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, numberAttribute, signal, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, MatButtonModule, RouterLink],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnChanges {
  readonly id = input.required<number, string>({ transform: numberAttribute });

  private readonly productService = inject(ProductService);
  protected readonly product = signal<Product | null>(null);

  protected readonly loading = signal(true);

  protected readonly error = signal<string | null>(null);

  private readonly cartService = inject(CartService);
  ngOnChanges(): void {
    this.loading.set(true);
    this.error.set(null);
    this.product.set(null);

    this.productService.getProductById(this.id()).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: (error) => {
        if (error.status === 404) {
          this.error.set('Product not found');
        } else {
          this.error.set('Failed to load product');
        }
        this.loading.set(false);
      },
    });
  }
  protected addToCart(): void {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
