import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';

@Component({
    selector: 'app-lab-admin-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './lab-admin-layout.component.html',
    styleUrl: './lab-admin-layout.component.css'
})
export class LabAdminLayoutComponent {
    constructor(private authService: AuthService) { }

    onLogout() {
        this.authService.logout();
    }
}
