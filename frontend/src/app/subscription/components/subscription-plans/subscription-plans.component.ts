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

    activeSubscriptionType: string | null = null;
    activePrice: number = 0;

    constructor(
        private subService: SubscriptionService,
        private auth: AuthService,
        private router: Router
    ) { }

    getActionType(plan: SubscriptionPlan): 'CURRENT' | 'UPGRADE' | 'DOWNGRADE' | 'BUY' {
        if (!this.activeSubscriptionType) return 'BUY';
        if (this.activeSubscriptionType.toUpperCase() === plan.name.toUpperCase()) return 'CURRENT';
        return plan.price > this.activePrice ? 'UPGRADE' : 'DOWNGRADE';
    }

    ngOnInit() {
        this.subService.getPlans().subscribe(data => {
            this.plans = data;

            const userId = this.auth.currentUserValue?.id;
            if (userId) {
                this.subService.getUserSubscription(userId).subscribe(sub => {
                    if (sub && sub.subscriptionType !== 'NONE' && new Date(sub.subscriptionExpiryDate) > new Date()) {
                        this.activeSubscriptionType = sub.subscriptionType;
                        // Find price of current plan from loaded plans
                        const currentPlan = this.plans.find(p => p.name.toUpperCase() === sub.subscriptionType.toUpperCase());
                        if (currentPlan) this.activePrice = currentPlan.price;
                    }
                });
            }
        });
    }

    buySubscription(plan: SubscriptionPlan) {
        const action = this.getActionType(plan);

        if (action === 'CURRENT') return;
        if (action === 'DOWNGRADE') {
            alert('You cannot downgrade your plan while it is active.');
            return;
        }

        const confirmMsg = action === 'UPGRADE'
            ? `Upgrade to ${plan.name} Plan for ₹${plan.price}?`
            : `Confirm purchase of ${plan.name} Plan for ₹${plan.price}?`;

        if (!confirm(confirmMsg)) return;

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
