import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    TitleCasePipe,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snack = inject(MatSnackBar);

  product = signal<Product | null>(null);
  selectedImage = signal('');
  quantity = signal(1);
  loading = signal(true);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.productService.getProductById(id).subscribe(product => {
        if (product) {
          this.product.set(product);
          this.selectedImage.set(product.image);
        }
        this.loading.set(false);
      });
    });
  }

  selectImage(img: string): void {
    this.selectedImage.set(img);
  }

  increaseQty(): void {
    const p = this.product();
    if (p && this.quantity() < p.stock) this.quantity.update(q => q + 1);
  }

  decreaseQty(): void {
    if (this.quantity() > 1) this.quantity.update(q => q - 1);
  }

  addToCart(): void {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p, this.quantity());
      this.snack.open('Produto adicionado ao carrinho!', 'Ver carrinho', { duration: 3000 });
    }
  }

  get stars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  get specEntries(): { key: string; value: string }[] {
    const p = this.product();
    return p ? Object.entries(p.specs).map(([key, value]) => ({ key, value })) : [];
  }
}
