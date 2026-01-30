import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../common/services/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './user-layout.component.html',
    styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
    currentUser$: Observable<any>;

    constructor(private router: Router, private authService: AuthService) {
        this.currentUser$ = this.authService.currentUser$;
    }

    logout() {
        this.authService.logout();
    }

    isPharmacy(): boolean {
        return this.router.url.includes('/pharmacy') ||
            this.router.url.includes('/cart') ||
            this.router.url.includes('/checkout') ||
            this.router.url.includes('/orders');
    }

    isConsultation(): boolean {
        return this.router.url.includes('/consultation');
    }

    isLabTest(): boolean {
        return this.router.url.includes('/lab-test');
    }

    isBloodDonation(): boolean {
        return this.router.url.includes('/blood-donation');
    }
}
