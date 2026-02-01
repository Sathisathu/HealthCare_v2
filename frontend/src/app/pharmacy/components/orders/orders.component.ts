import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyService } from '../../services/pharmacy.service';
import { Order } from '../../models/pharmacy.models';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];

    constructor(private api: PharmacyService, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.api.getOrders().subscribe({
            next: (data) => {
                this.orders = data.reverse();
            },
            error: (err) => console.error('Error fetching orders:', err)
        });
    }

    payForOrder(order: Order) {
        if (confirm(`Do you want to pay Rs. ${order.totalAmount} for your order?`)) {
            order.isPaying = true;
            setTimeout(() => {
                this.api.updatePaymentStatus(order.id!, 'PAID').subscribe({
                    next: () => {
                        order.isPaying = false;
                        this.loadOrders();
                        this.authService.checkSession();
                        alert('Payment Successful!');
                    },
                    error: (err) => {
                        order.isPaying = false;
                        alert('Payment failed: ' + err.message);
                    }
                });
            }, 1500);
        }
    }

    viewReceipt(order: Order) {
        this.router.navigate(['/receipt/pharmacy', order.id]);
    }




}
