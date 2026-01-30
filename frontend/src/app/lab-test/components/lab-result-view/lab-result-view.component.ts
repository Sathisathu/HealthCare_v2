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

    parsedResult: any | null = null; // Can be SpecificLabResult

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

    printReport() {
        window.print();
    }
}
