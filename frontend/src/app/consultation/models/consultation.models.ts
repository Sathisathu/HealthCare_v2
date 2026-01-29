export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    experience: string;
    consultationFee: number;
    imageUrl: string;
    businessPhoneNumber: string;
    clinicAddress: string;
}

export interface DoctorAvailability {
    id: number;
    doctorId: number;
    date: string;
    slotTime: string;
    available: boolean;
    booked: boolean;
}

export interface Appointment {
    id: number;
    patient?: any;
    doctor: Doctor;
    date: string;
    slotTime: string;
    consultationType: 'ONLINE' | 'OFFLINE';
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    paymentStatus: string;
    receiptUrl: string;
}
