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
}
