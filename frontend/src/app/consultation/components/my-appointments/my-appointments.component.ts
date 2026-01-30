import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { Appointment } from '../../models/consultation.models';
import { AuthService } from '../../../common/services/auth.service';

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

  constructor(private consultationService: ConsultationService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.consultationService.getUserAppointments(user.id).subscribe(res => {
          this.appointments = res;
        });
      }
    });
  }
}
