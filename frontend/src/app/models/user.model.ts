export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    walletBalance: number;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
    bloodGroup?: string;
    subscriptionType?: string;
    subscriptionExpiryDate?: string;
    pharmacyCreditBalance?: number;
    remainingConsultations?: number;
}
