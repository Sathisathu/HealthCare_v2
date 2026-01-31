import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Order } from '../models/pharmacy.models';

@Injectable({
    providedIn: 'root'
})
export class PharmacyService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    // Products
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/products`);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
    }

    addProduct(formData: FormData): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}/products`, formData);
    }

    updateProduct(id: number, formData: FormData): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}/products/${id}`, formData);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
    }

    // Orders
    placeOrder(order: Order): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/orders/place`, order);
    }

    getOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/orders`);
    }

    updatePaymentStatus(orderId: number, status: string): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/orders/${orderId}/payment`, { status });
    }
}
