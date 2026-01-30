import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';

@Component({
    selector: 'app-bloodbank-admin-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './bloodbank-admin-layout.component.html',
    styleUrl: './bloodbank-admin-layout.component.css'
})
export class BloodbankAdminLayoutComponent {
    constructor(private authService: AuthService) { }

    onLogout() {
        this.authService.logout();
    }
}
