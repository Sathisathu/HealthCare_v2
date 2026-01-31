import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Appointment, DoctorAvailability } from '../models/consultation.models';

@Injectable({
    providedIn: 'root'
})
export class ConsultationService {
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    getDoctors(query?: string): Observable<Doctor[]> {
        const url = query ? `${this.apiUrl}/doctors?query=${query}` : `${this.apiUrl}/doctors`;
        return this.http.get<Doctor[]>(url);
    }

    getDoctorById(id: number): Observable<Doctor> {
        return this.http.get<Doctor>(`${this.apiUrl}/doctors/${id}`);
    }

    getDoctorSlots(doctorId: number, date: string): Observable<DoctorAvailability[]> {
        return this.http.get<DoctorAvailability[]>(`${this.apiUrl}/doctors/${doctorId}/slots?date=${date}`);
    }

    toggleSlotAvailability(slotId: number, available: boolean): Observable<DoctorAvailability> {
        return this.http.put<DoctorAvailability>(`${this.apiUrl}/doctors/slots/${slotId}?available=${available}`, {});
    }

    bookAppointment(data: any): Observable<Appointment> {
        return this.http.post<Appointment>(`${this.apiUrl}/appointments`, data);
    }

    getUserAppointments(userId: number): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/user/${userId}`);
    }

    getDoctorAppointments(doctorId: number): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor/${doctorId}`);
    }

    updatePaymentStatus(apptId: number, status: string): Observable<Appointment> {
        return this.http.put<Appointment>(`${this.apiUrl}/appointments/${apptId}/payment`, { status });
    }
}
