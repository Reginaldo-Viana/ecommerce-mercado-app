import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../../core/models/product.model";
import { ProductService } from "../../core/services/product.service";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

interface CategoryGroup {
  id: string;
  name: string;
  products: Product[];
}

const CATEGORY_NAMES: Record<string, string> = {
  eletronicos: "Eletrônicos",
  moda: "Moda",
  casa: "Casa & Jardim",
  esportes: "Esportes",
  livros: "Livros",
  beleza: "Beleza",
};

@Component({
  selector: "app-products",
  standalone: true,
  imports: [ProductCardComponent, CommonModule, MatIconModule],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private products = signal<Product[]>([]);
  private activeCategoryParam = signal<string | null>(null);
  private searchQueryParam = signal<string | null>(null);

  readonly activeCategory = computed(() => this.activeCategoryParam());

  readonly allCategoryIds = computed(() => {
    const seen = new Set<string>();
    for (const p of this.products()) seen.add(p.category);
    return Array.from(seen);
  });

  readonly categories = computed<CategoryGroup[]>(() => {
    let filtered = this.products();
    const cat = this.activeCategoryParam();
    const busca = this.searchQueryParam();

    if (busca) {
      const q = busca.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    } else if (cat) {
      filtered = filtered.filter(p => p.category === cat);
    }

    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return Array.from(map.entries()).map(([id, prods]) => ({
      id,
      name: CATEGORY_NAMES[id] ?? id,
      products: prods,
    }));
  });

  readonly pageTitle = computed(() => {
    const busca = this.searchQueryParam();
    const cat = this.activeCategoryParam();
    if (busca) return `Resultados para "${busca}"`;
    if (cat) return CATEGORY_NAMES[cat] ?? cat;
    return "Todos os Produtos";
  });

  readonly totalCount = computed(() =>
    this.categories().reduce((acc, c) => acc + c.products.length, 0)
  );

  // Substitua o seu ngOnInit por este:

ngOnInit(): void {  
  this.productService.getProducts().subscribe(products => {        
    this.products.set(products);   
    this.route.queryParamMap.subscribe(params => {
      this.activeCategoryParam.set(params.get("categoria"));
      this.searchQueryParam.set(params.get("busca") ?? null);
    });
  });
}
  categoryName(id: string): string {
    return CATEGORY_NAMES[id] ?? id;
  }

  selectCategory(id: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: id ? { categoria: id } : {},
      queryParamsHandling: id ? "merge" : "",
    });
  }
}
