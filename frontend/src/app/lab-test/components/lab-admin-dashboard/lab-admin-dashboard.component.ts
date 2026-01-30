import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabTestService } from '../../services/lab-test.service';
import { LabTestBooking } from '../../models/lab-test.models';
import { LabResultEntryComponent } from '../lab-result-entry/lab-result-entry.component';

@Component({
    selector: 'app-lab-admin-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, LabResultEntryComponent],
    templateUrl: './lab-admin-dashboard.component.html',
    styleUrl: './lab-admin-dashboard.component.css'
})
export class LabAdminDashboardComponent implements OnInit {
    bookings: LabTestBooking[] = [];
    selectedBooking: LabTestBooking | null = null;
    showEntryModal = false;

    constructor(private labService: LabTestService) { }

    ngOnInit() {
        this.fetchBookings();
    }

    fetchBookings() {
        this.labService.getAllBookings().subscribe(res => {
            this.bookings = res;
        });
    }

    openResultEntry(booking: LabTestBooking) {
        this.selectedBooking = booking;
        this.showEntryModal = true;
    }

    handleSave(resultJson: string) {
        if (this.selectedBooking) {
            this.labService.uploadResult(this.selectedBooking.id, resultJson).subscribe({
                next: () => {
                    alert('Result Uploaded Successfully!');
                    this.showEntryModal = false;
                    this.selectedBooking = null;
                    this.fetchBookings();
                },
                error: (err) => alert('Upload Failed: ' + err.message)
            });
        }
    }

    handleCancel() {
        this.showEntryModal = false;
        this.selectedBooking = null;
    }
}
