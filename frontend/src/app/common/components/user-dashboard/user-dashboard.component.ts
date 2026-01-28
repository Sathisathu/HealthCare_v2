import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent { }
