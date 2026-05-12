import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data/products.json');
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.category === category))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const q = query.toLowerCase();
    return this.getProducts().pipe(
      map(products => products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ))
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/data/categories.json');
  }

  getFeatured(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.featured))
    );
  }

  getOffers(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.offer))
    );
  }
}
