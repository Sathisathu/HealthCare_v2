import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-doctor-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './doctor-login.component.html',
    styleUrl: './doctor-login.component.css'
})
export class DoctorLoginComponent {
    credentials = { email: '', password: '' };
    error = '';
    isProcessing = false;

    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
        this.isProcessing = true;
        this.error = '';

        this.authService.login(this.credentials).subscribe({
            next: (user) => {
                this.isProcessing = false;
                if (user.role === 'DOCTOR') {
                    this.router.navigate(['/doctor/dashboard']);
                } else {
                    this.error = 'Access Denied: This portal is for doctors only.';
                    this.authService.logout(); // Clear session if not a doctor
                }
            },
            error: (err) => {
                this.isProcessing = false;
                this.error = 'Invalid medical credentials or password.';
            }
        });
    }
}
