import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CartService } from '../../../services/cart.service';
import { User, OrderItem } from '../../../models/models';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  user: User | null = null;
  totalPrice = 0;
  paymentType = 'COD';
  isProcessing = false;
  errorMessage = '';

  constructor(private api: ApiService, private cart: CartService, private router: Router) { }

  async ngOnInit() {
    this.totalPrice = this.cart.getTotalPrice();
    if (this.totalPrice === 0) {
      this.router.navigate(['/']);
      return;
    }
    // Hardcoded for demo: User ID 1 is the test customer
    this.user = await firstValueFrom(this.api.getUser(1));
  }

  async placeOrder() {
    if (!this.user) return;

    this.isProcessing = true;
    this.errorMessage = '';

    const items: OrderItem[] = [];
    this.cart.cart$.subscribe(res => {
      res.forEach(item => items.push({ productId: item.productId, quantity: item.quantity }));
    }).unsubscribe();

    const orderData: any = {
      userId: this.user.id,
      paymentType: this.paymentType,
      items: items
    };

    this.api.placeOrder(orderData as any).subscribe({
      next: (res) => {
        alert('Order Placed Successfully!');
        this.cart.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Transaction Failed. Please check your wallet balance or stock.';
        this.isProcessing = false;
      }
    });
  }
}
