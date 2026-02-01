import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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


  constructor(private consultationService: ConsultationService, private authService: AuthService, private router: Router) { }

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
    this.router.navigate(['/receipt/consultation', appt.id]);
  }


}
