import { Routes } from '@angular/router';
import { CartPage } from './cart/cart-page/cart-page';
import { ProductsGrid } from './products/products-grid/products-grid';
import { NotFound } from './not-found/not-found';
import { ProductPage } from './products/product-page/product-page';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsGrid },
  { path: 'cart', component: CartPage },
  { path: 'products/:id', component: ProductPage },
  { path: '**', component: NotFound },
];
