import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { Appointment } from '../../models/consultation.models';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  userId = 1; // Mock user ID

  constructor(private consultationService: ConsultationService) { }

  ngOnInit() {
    this.consultationService.getUserAppointments(this.userId).subscribe(res => {
      this.appointments = res;
    });
  }
}
