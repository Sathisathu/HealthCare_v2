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
    return { name: '', description: '', price: 0, stockQuantity: 0, category: '', dosageForm: '', strength: '', packSize: '', isPrescriptionRequired: false };
  }

  selectedFile: File | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveProduct() {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(this.currentProduct)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editingProduct) {
      this.api.updateProduct(this.currentProduct.id!, formData).subscribe(() => {
        this.loadProducts();
        this.cancelEdit();
      });
    } else {
      this.api.addProduct(formData).subscribe(() => {
        this.loadProducts();
        this.currentProduct = this.resetProduct();
        this.selectedFile = null;
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
