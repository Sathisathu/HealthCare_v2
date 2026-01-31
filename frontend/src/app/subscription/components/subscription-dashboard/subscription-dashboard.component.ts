import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-subscription-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './subscription-dashboard.component.html',
    styleUrl: './subscription-dashboard.component.css'
})
export class SubscriptionDashboardComponent implements OnInit {
    userSubs: any = null;

    constructor(
        private subService: SubscriptionService,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        const user = this.auth.currentUserValue;
        if (user && user.id) {
            this.subService.getUserSubscription(user.id).subscribe(data => {
                this.userSubs = data;
            });
        }
    }

    isExpired(): boolean {
        if (!this.userSubs?.subscriptionExpiryDate) return true;
        return new Date(this.userSubs.subscriptionExpiryDate) < new Date();
    }
}
