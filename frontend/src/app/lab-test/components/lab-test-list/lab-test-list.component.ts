import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LabTestService } from '../../services/lab-test.service';
import { LabTest } from '../../models/lab-test.models';

@Component({
    selector: 'app-lab-test-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lab-test-list.component.html',
    styleUrl: './lab-test-list.component.css'
})
export class LabTestListComponent implements OnInit {
    tests: LabTest[] = [];

    constructor(private labService: LabTestService, private router: Router) { }

    ngOnInit() {
        this.labService.getTests().subscribe(res => this.tests = res);
    }

    selectTest(test: LabTest) {
        this.router.navigate(['/lab-test/book', test.testName]);
    }
}
