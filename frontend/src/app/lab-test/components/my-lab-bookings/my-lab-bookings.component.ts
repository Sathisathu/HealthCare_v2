import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LabTestService } from '../../services/lab-test.service';
import { LabTestBooking } from '../../models/lab-test.models';
import { AuthService } from '../../../common/services/auth.service';


@Component({
    selector: 'app-my-lab-bookings',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './my-lab-bookings.component.html',
    styleUrl: './my-lab-bookings.component.css'
})
export class MyLabBookingsComponent implements OnInit {
    bookings: LabTestBooking[] = [];
    userId: number | null = null;


    constructor(private labService: LabTestService, private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.userId = user.id;
                this.labService.getPatientBookings(user.id).subscribe(res => {
                    this.bookings = res;
                });
            }
        });
    }

    viewResult(bookingId: number) {
        this.router.navigate(['/lab-test/result', bookingId]);
    }

    loadBookings() {
        if (this.userId) {
            this.labService.getPatientBookings(this.userId).subscribe(res => {
                this.bookings = res;
            });
        }
    }

    payForBooking(booking: LabTestBooking) {
        if (confirm(`Do you want to pay Rs. ${booking.slot.price || 50} for your ${booking.slot.testName}?`)) {
            booking.isPaying = true;
            setTimeout(() => {
                this.labService.updatePaymentStatus(booking.id, 'PAID').subscribe({
                    next: () => {
                        booking.isPaying = false;
                        this.loadBookings();
                        this.authService.checkSession();
                        alert('Payment Successful!');
                    },
                    error: (err) => {
                        booking.isPaying = false;
                        const msg = err.error?.message || err.error || err.message || 'Unknown Error';
                        alert('Payment failed: ' + msg);
                    }
                });
            }, 1500);
        }
    }

    viewReceipt(booking: LabTestBooking) {
        this.router.navigate(['/receipt/labtest', booking.id]);
    }


}
