import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
    email = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (user) => {
                if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
                    this.router.navigate(['/admin']);
                } else if (user.role === 'LAB_ADMIN') {
                    this.router.navigate(['/lab-admin/dashboard']);
                } else if (user.role === 'BLOOD_BANK_ADMIN') {
                    this.router.navigate(['/bloodbank-admin/dashboard']);
                } else {
                    this.errorMessage = 'Access Denied: You do not have administrative privileges.';
                    this.authService.logout(); // Clear session if not an admin
                }
            },
            error: (err) => {
                this.errorMessage = 'Invalid Credentials for Admin Portal';
                console.error(err);
            }
        });
    }
}
