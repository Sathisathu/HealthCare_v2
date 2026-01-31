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
    paymentStatus?: string;
    receiptUrl?: string;
    isPaying?: boolean;
}
