import { Product } from './../products/product';
import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);

  readonly items = this.cartItems.asReadonly();

  readonly totalItems = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0),
  );

  removeFromCart(productId: number) {
    this.cartItems.update((items) => {
      return items.filter((item) => item.product.id !== productId);
    });
  }

  readonly totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  addToCart(product: Product) {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  increase(productId: number) {
    this.cartItems.update((items) => {
      return items.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }
  decrease(productId: number) {
    this.cartItems.update((items) => {
      return items
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
    });
  }
}
