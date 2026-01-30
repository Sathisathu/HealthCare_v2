import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabTestBooking, SpecificLabResult } from '../../models/lab-test.models';

@Component({
    selector: 'app-lab-result-entry',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './lab-result-entry.component.html',
    styleUrl: './lab-result-entry.component.css'
})
export class LabResultEntryComponent implements OnInit {
    @Input() booking!: LabTestBooking;
    @Output() save = new EventEmitter<string>();
    @Output() cancel = new EventEmitter<void>();

    selectedTemplate: string = 'GENERIC';
    resultData: any = {};

    ngOnInit() {
        this.autoSelectTemplate();
        this.initForm();
    }

    autoSelectTemplate() {
        const name = this.booking.slot.testName.toUpperCase();
        if (name.includes('CBC') || name.includes('COMPLETE BLOOD')) this.selectedTemplate = 'CBC';
        else if (name.includes('LIPID')) this.selectedTemplate = 'LIPID';
        else if (name.includes('THYROID') || name.includes('TSH')) this.selectedTemplate = 'THYROID';
        else if (name.includes('FBS') || name.includes('FASTING')) this.selectedTemplate = 'GLUCOSE_FBS';
        else if (name.includes('PPBS')) this.selectedTemplate = 'GLUCOSE_PPBS';
        else if (name.includes('HBA1C')) this.selectedTemplate = 'HBA1C';
        else if (name.includes('LFT') || name.includes('LIVER')) this.selectedTemplate = 'LFT';
        else if (name.includes('KFT') || name.includes('KIDNEY') || name.includes('RENAL')) this.selectedTemplate = 'KFT';
        else if (name.includes('URINE')) this.selectedTemplate = 'URINE';
        else if (name.includes('COVID')) this.selectedTemplate = 'COVID';
        else if (name.includes('VITAMIN D')) this.selectedTemplate = 'VITAMIN_D';
        else if (name.includes('B12')) this.selectedTemplate = 'VITAMIN_B12';
        else if (name.includes('PREGNANCY') || name.includes('HCG')) this.selectedTemplate = 'PREGNANCY';
        else if (name.includes('WIDAL') || name.includes('TYPHOID')) this.selectedTemplate = 'WIDAL';
        else if (name.includes('X-RAY') || name.includes('MRI') || name.includes('CT SCAN') || name.includes('ULTRASOUND') || name.includes('USG')) this.selectedTemplate = 'RADIOLOGY';
        else this.selectedTemplate = 'GENERIC';
    }

    initForm() {
        // Reset Data
        const basic = {
            testName: this.booking.slot.testName,
            date: new Date().toISOString().split('T')[0],
            remarks: ''
        };

        switch (this.selectedTemplate) {
            case 'PREGNANCY':
                this.resultData = {
                    ...basic,
                    testType: 'PREGNANCY',
                    betaHCG: { name: 'Beta hCG', value: '', range: '< 5 mIU/mL (Non-pregnant)' },
                    result: 'Negative',
                    weekEstimation: ''
                };
                break;
            case 'WIDAL':
                this.resultData = {
                    ...basic,
                    testType: 'WIDAL',
                    salmonellaTyphiO: '1:20',
                    salmonellaTyphiH: '1:20',
                    salmonellaParatyphiAH: '1:20',
                    salmonellaParatyphiBH: '1:20',
                    impression: 'Non-Reactive'
                };
                break;
            case 'RADIOLOGY':
                this.resultData = {
                    ...basic,
                    testType: 'RADIOLOGY',
                    modality: this.detectModality(this.booking.slot.testName),
                    bodyPart: '',
                    clinicalHistory: '',
                    impression: '',
                    imageUrl: '' // Placeholder for image URL
                };
                break;
            case 'CBC':
                this.resultData = {
                    ...basic,
                    testType: 'CBC',
                    hemoglobin: { name: 'Hemoglobin', value: '', range: '13-17 g/dL', status: 'Normal' },
                    rbc: { name: 'RBC Count', value: '', range: '4.5-5.5 mill/mm3', status: 'Normal' },
                    wbc: { name: 'WBC Count', value: '', range: '4-11 10^3/uL', status: 'Normal' },
                    platelet: { name: 'Platelet Count', value: '', range: '150-450 10^3/uL', status: 'Normal' },
                    hematocrit: { name: 'Hematocrit', value: '', range: '40-50 %', status: 'Normal' },
                    differential: {
                        neutrophils: { name: 'Neutrophils', value: '', range: '40-70 %' },
                        lymphocytes: { name: 'Lymphocytes', value: '', range: '20-40 %' },
                        monocytes: { name: 'Monocytes', value: '', range: '2-8 %' },
                        eosinophils: { name: 'Eosinophils', value: '', range: '1-6 %' },
                        basophils: { name: 'Basophils', value: '', range: '0-1 %' }
                    }
                };
                break;
            case 'LIPID':
                this.resultData = {
                    ...basic,
                    testType: 'LIPID',
                    totalCholesterol: { name: 'Total Cholesterol', value: '', range: '<200 mg/dL' },
                    ldl: { name: 'LDL Cholesterol', value: '', range: '<100 mg/dL' },
                    hdl: { name: 'HDL Cholesterol', value: '', range: '>40 mg/dL' },
                    triglycerides: { name: 'Triglycerides', value: '', range: '<150 mg/dL' },
                    vldl: { name: 'VLDL', value: '', range: '2-30 mg/dL' },
                    riskCategory: 'Low'
                };
                break;
            case 'THYROID':
                this.resultData = {
                    ...basic,
                    testType: 'THYROID',
                    t3: { name: 'Triiodothyronine (T3)', value: '', range: '80-200 ng/dL' },
                    t4: { name: 'Thyroxine (T4)', value: '', range: '5-12 ug/dL' },
                    tsh: { name: 'TSH', value: '', range: '0.5-5.0 uIU/mL' },
                    thyroidStatus: 'Normal'
                };
                break;
            case 'LFT':
                this.resultData = {
                    ...basic,
                    testType: 'LFT',
                    bilirubinTotal: { name: 'Total Bilirubin', value: '', range: '0.1-1.2 mg/dL' },
                    bilirubinDirect: { name: 'Direct Bilirubin', value: '', range: '0.0-0.3 mg/dL' },
                    sgot: { name: 'SGOT (AST)', value: '', range: '5-40 U/L' },
                    sgpt: { name: 'SGPT (ALT)', value: '', range: '7-56 U/L' },
                    alkalinePhosphatase: { name: 'Alkaline Phosphatase', value: '', range: '44-147 U/L' },
                    totalProtein: { name: 'Total Protein', value: '', range: '6.0-8.3 g/dL' },
                    albumin: { name: 'Albumin', value: '', range: '3.4-5.4 g/dL' }
                };
                break;
            case 'KFT':
                this.resultData = {
                    ...basic,
                    testType: 'KFT',
                    bloodUrea: { name: 'Blood Urea', value: '', range: '13-45 mg/dL' },
                    serumCreatinine: { name: 'Serum Creatinine', value: '', range: '0.6-1.2 mg/dL' },
                    uricAcid: { name: 'Uric Acid', value: '', range: '3.5-7.2 mg/dL' },
                    sodium: { name: 'Sodium', value: '', range: '135-145 mEq/L' },
                    potassium: { name: 'Potassium', value: '', range: '3.5-5.1 mEq/L' },
                    eGFR: { name: 'eGFR', value: '', range: '> 90 mL/min/1.73m2' }
                };
                break;
            case 'URINE':
                this.resultData = {
                    ...basic,
                    testType: 'URINE',
                    color: 'Pale Yellow',
                    appearance: 'Clear',
                    ph: { name: 'pH', value: '6.0', range: '4.5-8.0' },
                    protein: 'Absent',
                    sugar: 'Absent',
                    ketones: 'Absent',
                    pusCells: '0-2 /hpf',
                    rbc: 'Nil'
                };
                break;
            case 'GLUCOSE_FBS':
                this.resultData = {
                    ...basic,
                    testType: 'GLUCOSE',
                    label: 'Fasting Blood Sugar',
                    glucoseLevelOrHba1c: { name: 'Fasting Glucose', value: '', range: '70-99 mg/dL' },
                    interpretation: 'Normal'
                };
                break;
            case 'GLUCOSE_PPBS':
                this.resultData = {
                    ...basic,
                    testType: 'GLUCOSE',
                    label: 'Post Prandial Blood Sugar',
                    glucoseLevelOrHba1c: { name: 'PPBS Glucose', value: '', range: '< 140 mg/dL' },
                    interpretation: 'Normal'
                };
                break;
            case 'HBA1C':
                this.resultData = {
                    ...basic,
                    testType: 'HBA1C',
                    glucoseLevelOrHba1c: { name: 'HbA1c', value: '', range: '4.0-5.6% (Non-diabetic)' },
                    interpretation: 'Normal'
                };
                break;
            case 'VITAMIN_D':
                this.resultData = {
                    ...basic,
                    testType: 'VITAMIN',
                    level: { name: '25-Hydroxy Vitamin D', value: '', range: '30-100 ng/mL' },
                    deficiencyStatus: 'Normal'
                };
                break;
            case 'VITAMIN_B12':
                this.resultData = {
                    ...basic,
                    testType: 'VITAMIN',
                    level: { name: 'Vitamin B12', value: '', range: '200-900 pg/mL' },
                    deficiencyStatus: 'Normal'
                };
                break;
            case 'COVID':
                this.resultData = {
                    ...basic,
                    testType: 'COVID',
                    testMethod: 'RT-PCR',
                    result: 'Negative'
                };
                break;
            default:
                this.resultData = {
                    ...basic,
                    testType: 'GENERIC',
                    parameters: [{ name: 'Parameter 1', value: '', range: '' }]
                };
        }
    }

    detectModality(testName: string): string {
        const name = testName.toUpperCase();
        if (name.includes('MRI')) return 'MRI';
        if (name.includes('CT')) return 'CT Scan';
        if (name.includes('ULTRASOUND') || name.includes('USG')) return 'Ultrasound';
        return 'X-Ray';
    }


    addParameter() {
        if (this.resultData.parameters) {
            this.resultData.parameters.push({ name: '', value: '', range: '' });
        }
    }

    onSubmit() {
        this.save.emit(JSON.stringify(this.resultData));
    }

    onCancel() {
        this.cancel.emit();
    }
}
