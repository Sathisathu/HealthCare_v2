import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { Appointment } from '../../models/consultation.models';
import { AuthService } from '../../../common/services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  userId: number | null = null;
  showReceiptModal: boolean = false;
  selectedReceipt: Appointment | null = null;

  constructor(private consultationService: ConsultationService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.loadAppointments();
      }
    });
  }

  loadAppointments() {
    if (this.userId) {
      this.consultationService.getUserAppointments(this.userId).subscribe(res => {
        this.appointments = res;
      });
    }
  }

  payForAppointment(appt: Appointment) {
    if (confirm(`Do you want to pay Rs. ${appt.doctor.consultationFee} for your appointment with ${appt.doctor.name}?`)) {
      appt.isPaying = true;
      setTimeout(() => {
        this.consultationService.updatePaymentStatus(appt.id, 'PAID').subscribe({
          next: () => {
            appt.isPaying = false;
            this.loadAppointments();
            this.authService.checkSession();
            alert('Payment Successful!');
          },
          error: (err) => {
            appt.isPaying = false;
            const msg = err.error?.message || err.error || err.message || 'Unknown Error';
            alert('Payment failed: ' + msg);
          }
        });
      }, 1500);
    }
  }

  viewReceipt(appt: Appointment) {
    this.selectedReceipt = appt;
    this.showReceiptModal = true;
  }

  closeReceipt() {
    this.showReceiptModal = false;
    this.selectedReceipt = null;
  }

  downloadReceipt() {
    const element = document.getElementById('receipt-content');
    if (!element || !this.selectedReceipt) return;

    // Show a loading indicator if possible, but for a fast capture this is usually okay
    html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      onclone: (clonedDoc) => {
        // Hide action buttons in the PDF
        const actions = clonedDoc.querySelector('.modal-actions') as HTMLElement;
        if (actions) actions.style.display = 'none';
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Basic margins
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Medical_Receipt_${this.selectedReceipt?.receiptUrl}.pdf`);
    });
  }
}
