import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  private cart = inject(CartService);
  private snack = inject(MatSnackBar);

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cart.addToCart(this.product());
    this.snack.open('Produto adicionado ao carrinho!', 'Ver carrinho', { duration: 3000 });
  }

  get stars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}
