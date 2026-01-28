import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
    orders: any[] = [];

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        // For demo/Sprint 1, we fetch all orders and could filter by user locally if needed
        // However, the backend implementation of getOrders() should return relevant data.
        this.api.getOrders().subscribe({
            next: (data) => {
                // Reverse to show newest first
                this.orders = data.reverse();
            },
            error: (err) => console.error('Error fetching orders:', err)
        });
    }
}
