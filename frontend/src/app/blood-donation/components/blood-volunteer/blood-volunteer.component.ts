import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloodDonationService } from '../../services/blood-donation.service';
import { BloodDonationVolunteer } from '../../models/blood-donation.models';
import { AuthService } from '../../../common/services/auth.service';

@Component({
    selector: 'app-blood-volunteer',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './blood-volunteer.component.html',
    styleUrl: './blood-volunteer.component.css'
})
export class BloodVolunteerComponent implements OnInit {
    selectedDate: string = '';
    minDate: string = '';
    myDonations: BloodDonationVolunteer[] = [];
    userId: number | null = null;

    constructor(private bloodService: BloodDonationService, private authService: AuthService) { }

    ngOnInit() {
        this.minDate = new Date().toISOString().split('T')[0];
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.userId = user.id;
                this.fetchMyDonations();
            }
        });
    }

    fetchMyDonations() {
        if (!this.userId) return;
        this.bloodService.getPatientDonations(this.userId).subscribe(res => {
            this.myDonations = res;
        });
    }

    volunteer() {
        if (this.selectedDate && this.userId) {
            this.bloodService.volunteer(this.userId, this.selectedDate).subscribe({
                next: () => {
                    alert('Thank you for volunteering!');
                    this.selectedDate = '';
                    this.fetchMyDonations();
                },
                error: (err) => {
                    const msg = err.error?.message || err.error || err.message || 'Unknown error';
                    alert(msg);
                }
            });
        }
    }
}
