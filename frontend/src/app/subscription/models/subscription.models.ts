export interface SubscriptionPlan {
    id: number;
    name: string;
    price: number;
    pharmacyCreditLimit: number;
    consultationLimit: number;
}

export interface SubscriptionTransaction {
    id: number;
    planName: string;
    amount: number;
    purchaseDate: string;
    expiryDate: string;
    status: string;
    user: { id: number; name: string; email: string };
}

// Update User interface to include subscription details if needed,
// or just fetch it separately. For now, rely on separate endpoints or update User model.
// existing auth.service might need update or we just fetch details from subscription endpoint.
