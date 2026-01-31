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
    price?: number;
}

export interface LabTestBooking {
    id: number;
    patient: any;
    slot: LabTestSlot;
    status: 'BOOKED' | 'COMPLETED';
    testResultData?: string; // JSON string
    paymentStatus?: string;
    receiptUrl?: string;
    isPaying?: boolean;
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
    unit?: string; // e.g., g/dL, mg/dL
    status?: 'Low' | 'Normal' | 'High' | 'Abnormal' | 'Borderline';
}

// Specific Test Interfaces
export interface CBCTestResult extends LabResult {
    testType: 'CBC';
    hemoglobin: LabParameter;
    rbc: LabParameter;
    wbc: LabParameter;
    platelet: LabParameter;
    hematocrit: LabParameter;
    differential: {
        neutrophils: LabParameter;
        lymphocytes: LabParameter;
        monocytes: LabParameter;
        eosinophils: LabParameter;
        basophils: LabParameter;
    };
}

export interface LipidProfileResult extends LabResult {
    testType: 'LIPID';
    totalCholesterol: LabParameter;
    ldl: LabParameter;
    hdl: LabParameter;
    triglycerides: LabParameter;
    vldl: LabParameter;
    riskCategory: 'Low' | 'Moderate' | 'High';
}

export interface ThyroidProfileResult extends LabResult {
    testType: 'THYROID';
    t3: LabParameter;
    t4: LabParameter;
    tsh: LabParameter;
    thyroidStatus: 'Hypothyroid' | 'Hyperthyroid' | 'Normal';
}

export interface GlucoseTestResult extends LabResult {
    testType: 'GLUCOSE_FBS' | 'GLUCOSE_PPBS' | 'HBA1C';
    glucoseLevelOrHba1c: LabParameter;
    interpretation: 'Normal' | 'Prediabetic' | 'Diabetic' | 'Good Control' | 'Poor Control';
}

export interface LiverFunctionResult extends LabResult {
    testType: 'LFT';
    sgot: LabParameter;
    sgpt: LabParameter;
    alkalinePhosphatase: LabParameter;
    bilirubinTotal: LabParameter;
    bilirubinDirect: LabParameter;
    albumin: LabParameter;
    globulin: LabParameter;
}

export interface KidneyFunctionResult extends LabResult {
    testType: 'KFT';
    bloodUrea: LabParameter;
    serumCreatinine: LabParameter;
    uricAcid: LabParameter;
    sodium: LabParameter;
    potassium: LabParameter;
    eGFR: LabParameter;
}

export interface UrineRoutineResult extends LabResult {
    testType: 'URINE';
    color: string;
    appearance: string;
    ph: LabParameter;
    protein: 'Present' | 'Absent' | 'Trace';
    sugar: 'Present' | 'Absent';
    ketones: 'Present' | 'Absent';
    pusCells: string;
    rbc: string;
    infectionIndication: 'Yes' | 'No';
}

export interface CovidTestResult extends LabResult {
    testType: 'COVID';
    specimenType: 'Nasopharyngeal Swab' | 'Oropharyngeal Swab';
    testMethod: 'RT-PCR' | 'Antigen';
    result: 'Positive' | 'Negative';
    sampleDate: string;
    reportDate: string;
}

export interface VitaminTestResult extends LabResult {
    testType: 'VITAMIN_D' | 'VITAMIN_B12';
    level: LabParameter;
    deficiencyStatus: 'Deficient' | 'Insufficient' | 'Normal';
}

export interface RadiologyResult extends LabResult {
    testType: 'RADIOLOGY'; // X-RAY, MRI, CT, USG
    modality: 'X-Ray' | 'MRI' | 'CT Scan' | 'Ultrasound' | 'PET Scan';
    bodyPart: string;
    clinicalHistory: string;
    impression: string; // The main finding
    imageUrl?: string; // Optional image link
}

export interface PregnancyTestResult extends LabResult {
    testType: 'PREGNANCY';
    betaHCG: LabParameter;
    result: 'Positive' | 'Negative' | 'Indeterminate';
    weekEstimation?: string; // e.g., "3-4 Weeks"
}

export interface WidalTestResult extends LabResult {
    testType: 'WIDAL';
    salmonellaTyphiO: string; // e.g., "1:80"
    salmonellaTyphiH: string;
    salmonellaParatyphiAH: string;
    salmonellaParatyphiBH: string;
    impression: 'Reactive' | 'Non-Reactive';
}

// ... Add others as needed (Cardiac, Bone)
export type SpecificLabResult = CBCTestResult | LipidProfileResult | ThyroidProfileResult | GlucoseTestResult | LiverFunctionResult | KidneyFunctionResult | UrineRoutineResult | CovidTestResult | VitaminTestResult | RadiologyResult | PregnancyTestResult | WidalTestResult | LabResult;
