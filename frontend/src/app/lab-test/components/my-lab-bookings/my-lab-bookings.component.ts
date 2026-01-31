import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LabTestService } from '../../services/lab-test.service';
import { LabTestBooking } from '../../models/lab-test.models';
import { AuthService } from '../../../common/services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    showReceiptModal: boolean = false;
    selectedReceipt: LabTestBooking | null = null;

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
                        alert('Payment failed: ' + err.message);
                    }
                });
            }, 1500);
        }
    }

    viewReceipt(booking: LabTestBooking) {
        this.selectedReceipt = booking;
        this.showReceiptModal = true;
    }

    closeReceipt() {
        this.showReceiptModal = false;
        this.selectedReceipt = null;
    }

    downloadReceipt() {
        const element = document.getElementById('receipt-content');
        if (!element || !this.selectedReceipt) return;

        html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true,
            onclone: (clonedDoc) => {
                const actions = clonedDoc.querySelector('.modal-actions') as HTMLElement;
                if (actions) actions.style.display = 'none';
            }
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Lab_Receipt_${this.selectedReceipt?.receiptUrl}.pdf`);
        });
    }
}
