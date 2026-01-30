import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloodDonationService } from '../../services/blood-donation.service';
import { BloodDonationVolunteer } from '../../models/blood-donation.models';

@Component({
    selector: 'app-bloodbank-admin-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './bloodbank-admin-dashboard.component.html',
    styleUrl: './bloodbank-admin-dashboard.component.css'
})
export class BloodbankAdminDashboardComponent implements OnInit {
    volunteers: BloodDonationVolunteer[] = [];
    selectedVol: BloodDonationVolunteer | null = null;
    statusForm = {
        status: '',
        remarks: ''
    };

    constructor(private bloodService: BloodDonationService) { }

    ngOnInit() {
        this.fetchVolunteers();
    }

    fetchVolunteers() {
        this.bloodService.getAllVolunteers().subscribe(res => {
            this.volunteers = res;
        });
    }

    selectVolunteer(vol: BloodDonationVolunteer) {
        this.selectedVol = vol;
        this.statusForm.status = vol.status;
        this.statusForm.remarks = vol.remarks || '';
    }

    saveStatus() {
        if (this.selectedVol) {
            this.bloodService.updateStatus(this.selectedVol.id, this.statusForm.status, this.statusForm.remarks).subscribe({
                next: () => {
                    alert('Status Updated Successfully!');
                    this.selectedVol = null;
                    this.fetchVolunteers();
                },
                error: (err) => alert('Update Failed: ' + err.message)
            });
        }
    }
}
