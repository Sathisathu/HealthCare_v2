import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    user = { name: '', email: '', password: '', role: 'PATIENT' };
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    onRegister() {
        this.authService.register(this.user).subscribe({
            next: () => {
                alert('Registration successful! Please login.');
                this.router.navigate(['/login']);
            },
            error: (err) => this.error = err.error || 'Registration failed'
        });
    }
}
