import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultationService } from '../../services/consultation.service';
import { DoctorAvailability, Appointment, Doctor } from '../../models/consultation.models';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  doctor: Doctor | null = null;
  allDoctors: Doctor[] = [];
  dates: string[] = [];
  selectedDate: string = '';
  slots: DoctorAvailability[] = [];
  appointments: Appointment[] = [];
  doctorId: number = 0;

  constructor(private consultationService: ConsultationService) { }

  ngOnInit() {
    this.generateDates();
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.consultationService.getDoctors().subscribe(res => {
      this.allDoctors = res;
    });
  }

  loadDoctorData() {
    if (this.doctorId > 0) {
      this.consultationService.getDoctorById(this.doctorId).subscribe(res => {
        this.doctor = res;
        this.onDateChange();
        this.fetchAppointments();
      });
    } else {
      this.doctor = null;
    }
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
}
