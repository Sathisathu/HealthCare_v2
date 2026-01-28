import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-user-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './user-layout.component.html',
    styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent { }
