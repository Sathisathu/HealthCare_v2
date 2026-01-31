import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';

@Component({
    selector: 'app-doctor-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './doctor-layout.component.html',
    styleUrl: './doctor-layout.component.css'
})
export class DoctorLayoutComponent {
    constructor(private authService: AuthService) { }

    onLogout() {
        this.authService.logout();
    }
}
