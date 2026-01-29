import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LabTestService } from '../../services/lab-test.service';
import { LabTestBooking } from '../../models/lab-test.models';

@Component({
    selector: 'app-my-lab-bookings',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './my-lab-bookings.component.html',
    styleUrl: './my-lab-bookings.component.css'
})
export class MyLabBookingsComponent implements OnInit {
    bookings: LabTestBooking[] = [];
    userId = 1;

    constructor(private labService: LabTestService, private router: Router) { }

    ngOnInit() {
        this.labService.getPatientBookings(this.userId).subscribe(res => {
            this.bookings = res;
        });
    }

    viewResult(bookingId: number) {
        this.router.navigate(['/lab-test/result', bookingId]);
    }
}
