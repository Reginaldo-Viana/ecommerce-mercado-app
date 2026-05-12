import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart = inject(CartService);
  private snack = inject(MatSnackBar);
  orderPlaced = signal(false);

  updateQty(productId: number, qty: number): void {
    this.cart.updateQuantity(productId, qty);
  }

  remove(productId: number): void {
    this.cart.removeFromCart(productId);
  }

  finalize(): void {
    this.cart.clearCart();
    this.orderPlaced.set(true);
  }
}
