export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    imageUrl: string;
    dosageForm: string;
    strength: string;
    packSize: string;
    isPrescriptionRequired: boolean;
}

export interface User {
    id?: number;
    name: string;
    email: string;
    role: string;
    walletBalance: number;
}

export interface OrderItem {
    productId: number;
    quantity: number;
    product?: Product;
    priceAtPurchase?: number;
}

export interface Order {
    id?: number;
    status: string;
    totalAmount: number;
    paymentType: string;
    orderDate: string;
    orderItems: OrderItem[];
}

export interface Doctor {
    id?: number;
    name: string;
    specialization: string;
    consultationFee: number;
    businessContactNumber: string;
    profileImageUrl: string;
    address: string;
}

export interface DoctorAvailability {
    id?: number;
    doctorId: number;
    date: string;
    slotTime: string;
    consultationType: 'ONLINE' | 'OFFLINE';
    isAvailable: boolean;
}

export interface Appointment {
    id?: number;
    doctorId: number;
    patientId: number;
    appointmentDate: string;
    slotTime: string;
    consultationType: string;
    paymentStatus: string;
    totalAmount: number;
    receiptUrl: string;
    doctor?: Doctor;
    patient?: User; // Fixed for Doctor Dashboard
    createdAt?: string;
}
