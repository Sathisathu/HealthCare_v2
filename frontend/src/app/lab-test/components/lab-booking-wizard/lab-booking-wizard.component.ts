import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LabTestService } from '../../services/lab-test.service';
import { LabTestSlot } from '../../models/lab-test.models';
import { AuthService } from '../../../common/services/auth.service';

@Component({
    selector: 'app-lab-booking-wizard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './lab-booking-wizard.component.html',
    styleUrl: './lab-booking-wizard.component.css'
})
export class LabBookingWizardComponent implements OnInit {
    testName: string | null = null;
    dates: string[] = [];
    slots: LabTestSlot[] = [];

    selectedDate: string | null = null;
    selectedSlot: LabTestSlot | null = null;
    paymentType: string = 'WALLET'; // Default to WALLET

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private labService: LabTestService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.testName = this.route.snapshot.paramMap.get('testName');
        this.generateDates();
    }

    generateDates() {
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            this.dates.push(d.toISOString().split('T')[0]);
        }
    }

    onDateSelect(date: string) {
        this.selectedDate = date;
        this.selectedSlot = null;
        this.fetchSlots();
    }

    fetchSlots() {
        if (this.testName && this.selectedDate) {
            this.labService.getSlots(this.testName, this.selectedDate).subscribe(res => {
                this.slots = res;
            });
        }
    }

    selectSlot(slot: LabTestSlot) {
        this.selectedSlot = slot;
    }

    confirmBooking() {
        if (this.selectedSlot) {
            const user = this.authService.currentUserValue;
            if (!user) {
                alert('Please login to book a lab test');
                this.router.navigate(['/login']);
                return;
            }
            this.labService.bookTestWithDetails(user.id, this.selectedSlot, this.paymentType).subscribe({
                next: () => {
                    alert('Lab Test Booked Successfully!');
                    this.router.navigate(['/lab-test/my-bookings']);
                },
                error: (err) => alert('Booking Failed: ' + err.message)
            });
        }
    }

    goBack() {
        this.router.navigate(['/lab-test']);
    }
}
