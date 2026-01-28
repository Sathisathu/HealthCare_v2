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
    role: string; // 'CUSTOMER', 'ADMIN'
    walletBalance: number;
}

export interface OrderItem {
    productId: number;
    quantity: number;
    product?: Product;
}

export interface Order {
    id?: number;
    userId: number;
    paymentType: string; // 'COD', 'WALLET'
    items: OrderItem[];
    totalAmount?: number;
    status?: string;
}
