import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionPlan, SubscriptionTransaction } from '../models/subscription.models';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    private baseUrl = 'http://localhost:8080/api/subscriptions';

    constructor(private http: HttpClient) { }

    getPlans(): Observable<SubscriptionPlan[]> {
        return this.http.get<SubscriptionPlan[]>(`${this.baseUrl}/plans`);
    }

    purchaseSubscription(userId: number, planId: number, paymentType: string): Observable<SubscriptionTransaction> {
        return this.http.post<SubscriptionTransaction>(`${this.baseUrl}/purchase`, { userId, planId, paymentType });
    }

    getUserSubscription(userId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/user/${userId}`);
    }

    getPendingSubscriptions(): Observable<SubscriptionTransaction[]> {
        return this.http.get<SubscriptionTransaction[]>(`${this.baseUrl}/pending`);
    }

    approveSubscription(transactionId: number): Observable<SubscriptionTransaction> {
        return this.http.post<SubscriptionTransaction>(`${this.baseUrl}/approve/${transactionId}`, {});
    }
}
