import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../../common/services/auth.service';
import { SubscriptionPlan } from '../../models/subscription.models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-subscription-plans',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './subscription-plans.component.html',
    styleUrl: './subscription-plans.component.css'
})
export class SubscriptionPlansComponent implements OnInit {
    plans: SubscriptionPlan[] = [];

    constructor(
        private subService: SubscriptionService,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.subService.getPlans().subscribe(data => this.plans = data);
    }

    buySubscription(plan: SubscriptionPlan) {
        if (!confirm(`Confirm purchase of ${plan.name} Plan for ₹${plan.price}?`)) return;

        // Simulate Online Payment
        const userId = this.auth.currentUserValue?.id;
        if (userId) {
            // paymentType="ONLINE" (Simulated)
            this.subService.purchaseSubscription(userId, plan.id, 'ONLINE').subscribe({
                next: (res) => {
                    alert('Subscription Activated Successfully!');
                    this.router.navigate(['/patient-dashboard']); // Or subscription dashboard
                },
                error: (err) => alert('Purchase Failed: ' + (err.error?.message || err.message))
            });
        }
    }
}
