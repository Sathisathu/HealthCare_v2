export interface BloodDonationVolunteer {
    id: number;
    patient: any;
    donationDate: string;
    status: 'VOLUNTEERED' | 'DONATED' | 'NOT_ELIGIBLE' | 'NOT_VISITED';
    remarks: string;
    pointsAwarded: boolean;
}
