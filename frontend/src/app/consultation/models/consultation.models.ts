export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    experience: string;
    consultationFee: number;
    image: string;
    imageType: string;
    businessPhoneNumber: string;
    floor: string;
    roomNumber: string;
}

export interface DoctorAvailability {
    id: number;
    doctorId: number;
    date: string;
    slotTime: string;
    available: boolean;
    booked: boolean;
}

import { User } from '../../models/user.model';

export interface Appointment {
    id: number;
    patient?: User;
    doctor: Doctor;
    date: string;
    slotTime: string;
    consultationType: 'ONLINE' | 'OFFLINE';
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    paymentStatus: string;
    receiptUrl: string;
    isPaying?: boolean;
}
