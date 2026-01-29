import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LabTestService } from '../../services/lab-test.service';
import { LabTestSlot } from '../../models/lab-test.models';

@Component({
    selector: 'app-lab-booking-wizard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lab-booking-wizard.component.html',
    styleUrl: './lab-booking-wizard.component.css'
})
export class LabBookingWizardComponent implements OnInit {
    testName: string | null = null;
    dates: string[] = [];
    slots: LabTestSlot[] = [];

    selectedDate: string | null = null;
    selectedSlot: LabTestSlot | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private labService: LabTestService
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
            this.labService.bookTest(1, this.selectedSlot.id).subscribe({
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
