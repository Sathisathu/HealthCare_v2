import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabTest, LabTestSlot, LabTestBooking } from '../models/lab-test.models';

@Injectable({
    providedIn: 'root'
})
export class LabTestService {
    private apiUrl = 'http://localhost:8080/api/lab';

    constructor(private http: HttpClient) { }

    getTests(): Observable<LabTest[]> {
        return this.http.get<LabTest[]>(`${this.apiUrl}/tests`);
    }

    getSlots(testName: string, date: string): Observable<LabTestSlot[]> {
        return this.http.get<LabTestSlot[]>(`${this.apiUrl}/tests/slots?testName=${testName}&date=${date}`);
    }

    bookTest(patientId: number, slotId: number): Observable<LabTestBooking> {
        // This legacy method might not work with new backend which requires testName/date/time.
        // We should use bookTestWithDetails primarily.
        // Or finding slot by ID if we persisted them first? But we use virtual slots.
        throw new Error("Use bookTestWithDetails");
    }

    bookTestWithDetails(patientId: number, slot: LabTestSlot, paymentType: string): Observable<LabTestBooking> {
        const payload = {
            patientId: patientId,
            testName: slot.testName,
            date: slot.date,
            time: slot.time,
            paymentType: paymentType
        };
        return this.http.post<LabTestBooking>(`${this.apiUrl}/bookings/book`, payload);
    }

    getPatientBookings(patientId: number): Observable<LabTestBooking[]> {
        return this.http.get<LabTestBooking[]>(`${this.apiUrl}/bookings/patient/${patientId}`);
    }

    getAllBookings(): Observable<LabTestBooking[]> {
        return this.http.get<LabTestBooking[]>(`${this.apiUrl}/bookings`);
    }

    uploadResult(bookingId: number, resultData: string): Observable<LabTestBooking> {
        return this.http.post<LabTestBooking>(`${this.apiUrl}/bookings/result/${bookingId}`, resultData);
    }

    getBooking(bookingId: number): Observable<LabTestBooking> {
        return this.http.get<LabTestBooking>(`${this.apiUrl}/bookings/result/${bookingId}`);
    }

    updatePaymentStatus(bookingId: number, status: string): Observable<LabTestBooking> {
        return this.http.put<LabTestBooking>(`${this.apiUrl}/bookings/${bookingId}/payment`, { status });
    }
}
