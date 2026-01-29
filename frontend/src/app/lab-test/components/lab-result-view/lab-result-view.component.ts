import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LabTestService } from '../../services/lab-test.service';
import { LabResult } from '../../models/lab-test.models';

@Component({
    selector: 'app-lab-result-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lab-result-view.component.html',
    styleUrl: './lab-result-view.component.css'
})
export class LabResultViewComponent implements OnInit {
    bookingId: number | null = null;
    parsedResult: LabResult | null = null;

    constructor(
        private route: ActivatedRoute,
        private labService: LabTestService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('bookingId');
        if (id) {
            this.bookingId = +id;
            this.fetchResult();
        }
    }

    fetchResult() {
        if (this.bookingId) {
            this.labService.getBooking(this.bookingId).subscribe(res => {
                if (res.testResultData) {
                    this.parsedResult = JSON.parse(res.testResultData);
                }
            });
        }
    }

    getUnit(paramName: string): string {
        const name = paramName.toLowerCase();
        if (name.includes('count')) return 'cells/mcL';
        if (name.includes('hemoglobin')) return 'g/dL';
        if (name.includes('glucose') || name.includes('cholesterol')) return 'mg/dL';
        return '-';
    }

    isAbnormal(value: string, range: string): boolean {
        // Simple numeric comparison if applicable
        const val = parseFloat(value);
        if (isNaN(val)) return false;

        const parts = range.split('-').map(p => parseFloat(p.trim()));
        if (parts.length === 2) {
            return val < parts[0] || val > parts[1];
        }
        return false;
    }

    printReport() {
        window.print();
    }
}
