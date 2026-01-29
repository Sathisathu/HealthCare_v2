import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-doctor-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './doctor-layout.component.html',
    styleUrl: './doctor-layout.component.css'
})
export class DoctorLayoutComponent { }
