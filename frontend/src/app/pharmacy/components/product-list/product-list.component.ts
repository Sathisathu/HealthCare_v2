import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyService } from '../../services/pharmacy.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/pharmacy.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private api: PharmacyService, private cart: CartService) { }

  ngOnInit() {
    this.api.getProducts().subscribe(data => this.products = data);
  }

  addToCart(product: Product) {
    this.cart.addToCart(product);
    alert(`${product.name} added to cart!`);
  }
}
