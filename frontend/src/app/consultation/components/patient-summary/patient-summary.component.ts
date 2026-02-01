import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment } from '../../models/consultation.models';
import { ConsultationService } from '../../services/consultation.service';

@Component({
    selector: 'app-patient-summary',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './patient-summary.component.html',
    styleUrl: './patient-summary.component.css'
})
export class PatientSummaryComponent implements OnInit {
    appointment: Appointment | null = null;
    loading = true;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private consultationService: ConsultationService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.fetchAppointment(Number(id));
        } else {
            this.error = 'Invalid Appointment ID';
            this.loading = false;
        }
    }

    fetchAppointment(id: number) {
        this.consultationService.getAppointmentById(id).subscribe({
            next: (data) => {
                this.appointment = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load patient details';
                this.loading = false;
                console.error(err);
            }
        });
    }

    goBack() {
        this.router.navigate(['/doctor/dashboard']);
    }
}
