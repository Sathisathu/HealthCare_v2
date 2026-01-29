export interface LabTest {
    id: number;
    testName: string;
    description: string;
    price: number;
    testType: 'BLOOD_TEST' | 'SCAN';
}

export interface LabTestSlot {
    id: number;
    testName: string;
    date: string;
    time: string;
    booked: boolean;
}

export interface LabTestBooking {
    id: number;
    patient: any;
    slot: LabTestSlot;
    status: 'BOOKED' | 'COMPLETED';
    testResultData?: string; // JSON string
}

export interface LabResult {
    testName: string;
    date: string;
    remarks: string;
    parameters: LabParameter[];
}

export interface LabParameter {
    name: string;
    value: string;
    range: string;
}
