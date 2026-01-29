import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabTestService } from '../../services/lab-test.service';
import { LabTestBooking } from '../../models/lab-test.models';

@Component({
    selector: 'app-lab-admin-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './lab-admin-dashboard.component.html',
    styleUrl: './lab-admin-dashboard.component.css'
})
export class LabAdminDashboardComponent implements OnInit {
    bookings: LabTestBooking[] = [];
    selectedBooking: LabTestBooking | null = null;

    resultForm = {
        testName: '',
        date: new Date().toISOString(),
        remarks: '',
        parameters: [
            { name: '', value: '', range: '' }
        ]
    };

    constructor(private labService: LabTestService) { }

    ngOnInit() {
        this.fetchBookings();
    }

    fetchBookings() {
        this.labService.getAllBookings().subscribe(res => {
            this.bookings = res;
        });
    }

    selectBooking(booking: LabTestBooking) {
        this.selectedBooking = booking;
        this.resultForm.testName = booking.slot.testName;
        this.resultForm.parameters = [
            { name: 'Hemoglobin', value: '', range: '12-16' },
            { name: 'White Blood Cell Count', value: '', range: '4.5-11.0' },
            { name: 'Platelet Count', value: '', range: '150-450' }
        ];
    }

    addParameter() {
        this.resultForm.parameters.push({ name: '', value: '', range: '' });
    }

    submitResult() {
        if (this.selectedBooking) {
            const resultString = JSON.stringify(this.resultForm);
            this.labService.uploadResult(this.selectedBooking.id, resultString).subscribe({
                next: () => {
                    alert('Result Uploaded Successfully!');
                    this.selectedBooking = null;
                    this.fetchBookings();
                },
                error: (err) => alert('Upload Failed: ' + err.message)
            });
        }
    }
}
