import { ProductService } from './../product-service';
import { Component, signal, computed, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../product';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from '../../cart/cart-service';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatIcon, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  protected readonly searchTerm = signal('');
  private readonly productService = inject(ProductService);
  protected readonly products = this.productService.products;

  protected readonly loading = this.productService.loading;
  protected readonly error = this.productService.error;

  private readonly cartService = inject(CartService);

  protected readonly filteredProducts = computed(() => {
    const term = this.searchTerm().toLocaleLowerCase().trim();
    if (!term) return this.products();

    return this.products().filter(
      (product) =>
        product.name.toLocaleLowerCase().includes(term) ||
        product.description.toLocaleLowerCase().includes(term),
    );
  });

  protected readonly sortOrder = this.productService.sortOrder;

  protected readonly sortedProducts = computed(() => {
    const products = [...this.filteredProducts()];

    if (this.sortOrder() === 'asc') {
      return products.sort((a, b) => a.price - b.price);
    }
    return products.sort((a, b) => b.price - a.price);
  });

  protected onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  // protected clearSearch() {
  //   this.searchTerm.set('');
  // }

  // protected trimSearch() {
  //   this.searchTerm.update((value) => value.trim());
  // }
}
