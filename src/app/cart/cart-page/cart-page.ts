import { Component, inject } from '@angular/core';
import { CartService } from '../cart-service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, RouterLink, MatIcon, MatButtonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  protected readonly cartService = inject(CartService);
}
