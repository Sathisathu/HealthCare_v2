import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { DoctorAvailability, Appointment, Doctor } from '../../models/consultation.models';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  doctor: Doctor | null = null;
  dates: string[] = [];
  selectedDate: string = '';
  slots: DoctorAvailability[] = [];
  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;

  constructor(
    private consultationService: ConsultationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.generateDates();
    this.authService.currentUser$.subscribe(user => {
      if (user && user.role === 'DOCTOR') {
        this.consultationService.getDoctorById(user.id).subscribe(res => {
          this.doctor = res;
          this.onDateChange();
          this.fetchAppointments();
        });
      }
    });
  }

  generateDates() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      this.dates.push(d.toISOString().split('T')[0]);
    }
    this.selectedDate = this.dates[0];
  }

  onDateChange() {
    if (this.doctor) {
      this.consultationService.getDoctorSlots(this.doctor.id, this.selectedDate).subscribe(res => {
        this.slots = res;
      });
    }
  }

  fetchAppointments() {
    if (this.doctor) {
      this.consultationService.getDoctorAppointments(this.doctor.id).subscribe(res => {
        this.appointments = res;
      });
    }
  }

  toggleAvailability(slot: DoctorAvailability) {
    if (slot.booked) return;
    this.consultationService.toggleSlotAvailability(slot.id, !slot.available).subscribe(res => {
      slot.available = res.available;
    });
  }

  viewPatientDetails(appt: Appointment) {
    this.router.navigate(['/doctor/patient-summary', appt.id]);
  }
}
