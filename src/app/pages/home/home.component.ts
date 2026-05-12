import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService, Category } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);

  featured = signal<Product[]>([]);
  offers = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.productService.getCategories().subscribe(cats => this.categories.set(cats));
    this.productService.getFeatured().subscribe(products => this.featured.set(products));
    this.productService.getOffers().subscribe(products => {
      this.offers.set(products.slice(0, 6));
      this.loading.set(false);
    });
  }
}
