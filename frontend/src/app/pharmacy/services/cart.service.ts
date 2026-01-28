import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, OrderItem } from '../models/pharmacy.models';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: OrderItem[] = [];
    private cartSubject = new BehaviorSubject<OrderItem[]>([]);

    cart$ = this.cartSubject.asObservable();

    addToCart(product: Product) {
        const existing = this.cartItems.find(item => item.productId === product.id);
        if (existing) {
            if (existing.quantity < (product.stockQuantity || 0)) {
                existing.quantity++;
            } else {
                alert(`Cannot add more. Only ${product.stockQuantity} items available in stock.`);
            }
        } else {
            if ((product.stockQuantity || 0) > 0) {
                this.cartItems.push({ productId: product.id!, quantity: 1, product: product });
            }
        }
        this.cartSubject.next([...this.cartItems]);
    }

    removeFromCart(productId: number) {
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        this.cartSubject.next([...this.cartItems]);
    }

    updateQuantity(productId: number, quantity: number) {
        const item = this.cartItems.find(item => item.productId === productId);
        if (item) {
            const stockLimit = item.product?.stockQuantity || 0;
            if (quantity > stockLimit) {
                alert(`Only ${stockLimit} items available in stock.`);
                item.quantity = stockLimit;
            } else {
                item.quantity = quantity;
            }

            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.cartSubject.next([...this.cartItems]);
            }
        }
    }

    clearCart() {
        this.cartItems = [];
        this.cartSubject.next([]);
    }

    getTotalPrice(): number {
        return this.cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
    }
}
