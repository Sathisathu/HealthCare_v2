import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    credentials = { email: '', password: '' };
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
        this.authService.login(this.credentials).subscribe({
            next: (user) => {
                if (user.role === 'PATIENT') {
                    this.router.navigate(['/']);
                } else if (user.role === 'DOCTOR') {
                    this.router.navigate(['/doctor/dashboard']);
                } else if (['ADMIN', 'LAB_ADMIN', 'BLOOD_BANK_ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
                    // Redirect admins to the unified admin login which handles their routing
                    // Or directly to their dashboard if preferred. 
                    // Let's be helpful and redirect them to their dashboard via the admin login logic
                    // Actually, since we are already logged in, we can direct them.
                    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') this.router.navigate(['/admin']);
                    else if (user.role === 'LAB_ADMIN') this.router.navigate(['/lab-admin/dashboard']);
                    else if (user.role === 'BLOOD_BANK_ADMIN') this.router.navigate(['/bloodbank-admin/dashboard']);
                } else {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => this.error = 'Invalid email or password'
        });
    }
}
