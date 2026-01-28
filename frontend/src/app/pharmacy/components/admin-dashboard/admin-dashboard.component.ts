import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PharmacyService } from '../../services/pharmacy.service';
import { Product } from '../../models/pharmacy.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  currentProduct: Product = this.resetProduct();
  editingProduct = false;

  constructor(private api: PharmacyService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe(data => this.products = data);
  }

  resetProduct(): Product {
    return { name: '', description: '', price: 0, stockQuantity: 0, category: '', imageUrl: 'https://via.placeholder.com/150', dosageForm: '', strength: '', packSize: '', isPrescriptionRequired: false };
  }

  saveProduct() {
    if (this.editingProduct) {
      this.api.updateProduct(this.currentProduct.id!, this.currentProduct).subscribe(() => {
        this.loadProducts();
        this.cancelEdit();
      });
    } else {
      this.api.addProduct(this.currentProduct).subscribe(() => {
        this.loadProducts();
        this.currentProduct = this.resetProduct();
      });
    }
  }

  editProduct(p: Product) {
    this.editingProduct = true;
    this.currentProduct = { ...p };
  }

  cancelEdit() {
    this.editingProduct = false;
    this.currentProduct = this.resetProduct();
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.api.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}
