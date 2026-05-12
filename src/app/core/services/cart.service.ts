import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);

  count = computed(() => this.items().reduce((acc, i) => acc + i.quantity, 0));

  total = computed(() =>
    this.items().reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  );

  addToCart(product: Product, quantity = 1): void {
    this.items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...items, { product, quantity }];
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  removeFromCart(productId: number): void {
    this.items.update(items => items.filter(i => i.product.id !== productId));
  }

  clearCart(): void {
    this.items.set([]);
  }
}
