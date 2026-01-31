import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../../subscription/services/subscription.service';
import { Observable, take } from 'rxjs';

@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
    currentUser$: Observable<any>;
    hasSubscription: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private subService: SubscriptionService
    ) {
        this.currentUser$ = this.authService.currentUser$;
    }

    ngOnInit() {
        this.authService.currentUser$.pipe(take(1)).subscribe(user => {
            if (user) {
                if (user.role === 'DOCTOR') {
                    this.router.navigate(['/doctor/dashboard']);
                } else if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
                    this.router.navigate(['/admin']);
                } else if (user.role === 'LAB_ADMIN') {
                    this.router.navigate(['/lab-admin/dashboard']);
                } else if (user.role === 'BLOOD_BANK_ADMIN') {
                    this.router.navigate(['/bloodbank-admin/dashboard']);
                } else {
                    // Check subscription for patient
                    this.checkSubscription(user.id);
                }
            }
        });
    }

    checkSubscription(userId: number) {
        this.subService.getUserSubscription(userId).subscribe({
            next: (data) => {
                this.hasSubscription = data && data.subscriptionType !== 'NONE';
            },
            error: () => {
                this.hasSubscription = false;
            }
        });
    }
}
