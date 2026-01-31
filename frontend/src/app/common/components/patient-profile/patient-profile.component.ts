import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-patient-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './patient-profile.component.html',
    styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent implements OnInit {
    patient: User | null = null;
    loading: boolean = true;
    error: string | null = null;
    isEditing: boolean = false;
    profileForm!: FormGroup;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.initForm();
    }

    private initForm(): void {
        this.profileForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: [''],
            address: [''],
            dateOfBirth: [''],
            gender: [''],
            bloodGroup: ['']
        });
    }

    ngOnInit(): void {
        this.loadProfile();
    }

    loadProfile(): void {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.id) {
            this.userService.getUser(currentUser.id).subscribe({
                next: (data: User) => {
                    this.patient = data;
                    this.loading = false;
                    this.profileForm.patchValue(data);
                },
                error: (err: any) => {
                    this.error = 'Failed to load profile information.';
                    this.loading = false;
                    console.error(err);
                }
            });
        } else {
            this.error = 'User not logged in.';
            this.loading = false;
        }
    }

    toggleEdit(): void {
        this.isEditing = !this.isEditing;
        if (this.isEditing && this.patient) {
            this.profileForm.patchValue(this.patient);
        }
    }

    saveProfile(): void {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        if (this.patient && this.patient.id) {
            this.loading = true;
            const updatedUser = { ...this.patient, ...this.profileForm.value };
            console.log('Sending PUT request to:', `api/patients/${this.patient.id}`, updatedUser);

            this.userService.updateUser(this.patient.id, updatedUser).subscribe({
                next: (data: User) => {
                    console.log('Update successful:', data);
                    this.patient = data;
                    this.isEditing = false;
                    this.loading = false;
                    this.authService.checkSession();
                },
                error: (err: any) => {
                    console.error('Update failed:', err);
                    this.error = 'Failed to update profile. Please ensure the server is running with the latest changes.';
                    this.loading = false;
                }
            });
        } else {
            console.error('No patient ID found', this.patient);
            this.error = 'Unable to save: Profile ID not found.';
        }
    }

    cancelEdit(): void {
        this.isEditing = false;
        if (this.patient) {
            this.profileForm.patchValue(this.patient);
        }
    }
    topUp(): void {
        if (this.patient && this.patient.id) {
            const currentBalance = this.patient.walletBalance || 0;
            const updatedUser = { ...this.patient, walletBalance: currentBalance + 500 };

            this.userService.updateUser(this.patient.id, updatedUser).subscribe({
                next: (data: User) => {
                    this.patient = data;
                    this.authService.checkSession();
                    alert('Wallet topped up with 500 coins!');
                },
                error: (err: any) => {
                    console.error('Top up failed:', err);
                    alert('Failed to top up wallet');
                }
            });
        }
    }
}
