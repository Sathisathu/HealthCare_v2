import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BloodDonationVolunteer } from '../models/blood-donation.models';

@Injectable({
    providedIn: 'root'
})
export class BloodDonationService {
    private apiUrl = 'http://localhost:8080/api/blood-donation';

    constructor(private http: HttpClient) { }

    volunteer(userId: number, date: string): Observable<BloodDonationVolunteer> {
        return this.http.post<BloodDonationVolunteer>(`${this.apiUrl}/volunteer`, { userId, date });
    }

    getPatientDonations(userId: number): Observable<BloodDonationVolunteer[]> {
        return this.http.get<BloodDonationVolunteer[]>(`${this.apiUrl}/patient/${userId}`);
    }

    getAllVolunteers(): Observable<BloodDonationVolunteer[]> {
        return this.http.get<BloodDonationVolunteer[]>(`${this.apiUrl}/admin/list`);
    }

    updateStatus(id: number, status: string, remarks: string): Observable<BloodDonationVolunteer> {
        return this.http.put<BloodDonationVolunteer>(`${this.apiUrl}/admin/status/${id}`, { status, remarks });
    }
}
