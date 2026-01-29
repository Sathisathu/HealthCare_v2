import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './user-layout.component.html',
    styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
    constructor(private router: Router) { }

    isPharmacy(): boolean {
        return this.router.url.includes('/pharmacy') ||
            this.router.url.includes('/cart') ||
            this.router.url.includes('/checkout') ||
            this.router.url.includes('/orders');
    }

    isConsultation(): boolean {
        return this.router.url.includes('/consultation');
    }
}
