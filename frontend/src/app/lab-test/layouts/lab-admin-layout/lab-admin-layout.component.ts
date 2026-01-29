import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-lab-admin-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './lab-admin-layout.component.html',
    styleUrl: './lab-admin-layout.component.css'
})
export class LabAdminLayoutComponent { }
