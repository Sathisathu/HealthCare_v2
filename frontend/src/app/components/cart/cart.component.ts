import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems$;

  constructor(private cart: CartService, private router: Router) {
    this.cartItems$ = this.cart.cart$;
  }

  updateQty(pid: number, newQty: number) {
    this.cart.updateQuantity(pid, newQty);
  }

  remove(pid: number) {
    this.cart.removeFromCart(pid);
  }

  getTotal() {
    return this.cart.getTotalPrice();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
