import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { Doctor, DoctorAvailability } from '../../models/consultation.models';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | null = null;
  slots: DoctorAvailability[] = [];
  dates: string[] = [];

  selectedDate: string = '';
  selectedType: 'ONLINE' | 'OFFLINE' = 'ONLINE';
  selectedSlot: DoctorAvailability | null = null;

  showPaymentModal: boolean = false;
  isProcessingPayment: boolean = false;
  bookedAppointmentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultationService: ConsultationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.consultationService.getDoctorById(+id).subscribe(res => {
        this.doctor = res;
        this.generateAvailableDates();
      });
    }
  }

  generateAvailableDates() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      this.dates.push(d.toISOString().split('T')[0]);
    }
    this.onDateSelect(this.dates[0]);
  }

  onDateSelect(date: string) {
    this.selectedDate = date;
    this.selectedSlot = null;
    if (this.doctor) {
      this.consultationService.getDoctorSlots(this.doctor.id, date).subscribe(res => {
        this.slots = res;
      });
    }
  }

  selectSlot(slot: DoctorAvailability) {
    if (slot.available) {
      this.selectedSlot = slot;
    }
  }

  bookNow() {
    if (this.selectedSlot && this.doctor) {
      const user = this.authService.currentUserValue;
      if (!user) {
        alert('Please login to book an appointment');
        this.router.navigate(['/login']);
        return;
      }
      if (user.role !== 'PATIENT') {
        alert('Only patients can book appointments.');
        return;
      }

      const payload = {
        userId: user.id,
        doctorId: this.doctor.id,
        date: this.selectedDate,
        slotTime: this.selectedSlot.slotTime,
        type: this.selectedType
      };

      this.consultationService.bookAppointment(payload).subscribe({
        next: (appt) => {
          console.log('DEBUG: Appointment Booked on Server:', appt);
          this.bookedAppointmentId = appt.id;
          this.showPaymentModal = true;
        },
        error: (err) => alert('Booking failed: ' + err.message)
      });
    }
  }

  confirmPayment() {
    if (!this.bookedAppointmentId) return;
    this.isProcessingPayment = true;

    this.consultationService.updatePaymentStatus(this.bookedAppointmentId!, 'PAID').subscribe({
      next: () => {
        this.isProcessingPayment = false;
        this.showPaymentModal = false;
        this.authService.checkSession();
        this.router.navigate(['/consultation/my-appointments']);
      },
      error: (err) => {
        this.isProcessingPayment = false;
        alert('Payment update failed on server, but slot is booked. Please try paying from your appointments list.');
        this.router.navigate(['/consultation/my-appointments']);
      }
    });
  }

  closePaymentModal() {
    if (!this.isProcessingPayment) {
      this.showPaymentModal = false;
      this.router.navigate(['/consultation/my-appointments']);
    }
  }
}
