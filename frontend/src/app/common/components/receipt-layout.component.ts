import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../../pharmacy/services/pharmacy.service';
import { ConsultationService } from '../../consultation/services/consultation.service';
import { LabTestService } from '../../lab-test/services/lab-test.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-receipt-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-layout.component.html',
  styleUrl: './receipt-layout.component.css'
})
export class ReceiptLayoutComponent implements OnInit {
  type: string = '';
  id: number = 0;
  loading: boolean = true;
  error: string = '';
  receiptData: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pharmacyService: PharmacyService,
    private consultationService: ConsultationService,
    private labTestService: LabTestService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.id = +params['id'];
      this.loadReceipt();
    });
  }

  loadReceipt() {
    this.loading = true;
    this.authService.currentUser$.subscribe(user => {
      if (!user) {
        this.error = 'Please log in to view receipt';
        this.loading = false;
        return;
      }

      if (this.type === 'pharmacy') {
        this.pharmacyService.getOrders().subscribe({
          next: (orders: any[]) => {
            // Loose equality for ID matching (string vs number)
            this.receiptData = orders.find((o: any) => o.id == this.id);

            if (!this.receiptData) {
              this.error = 'Receipt not found';
            }
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Error fetching orders:', err);
            this.error = 'Failed to load receipt';
            this.loading = false;
          }
        });
      } else if (this.type === 'consultation') {
        this.consultationService.getUserAppointments(user.id).subscribe({
          next: (appts: any[]) => {
            // Loose equality for ID matching
            this.receiptData = appts.find((a: any) => a.id == this.id);

            if (!this.receiptData) {
              this.error = 'Receipt not found';
            }
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Error fetching appointments:', err);
            this.error = 'Failed to load receipt';
            this.loading = false;
          }
        });
      } else if (this.type === 'labtest') {
        this.labTestService.getPatientBookings(user.id).subscribe({
          next: (bookings: any[]) => {
            this.receiptData = bookings.find((b: any) => b.id == this.id);
            if (!this.receiptData) {
              this.error = 'Receipt not found';
            }
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Error fetching lab bookings:', err);
            this.error = 'Failed to load receipt';
            this.loading = false;
          }
        });
      } else {
        this.error = 'Invalid receipt type';
        this.loading = false;
      }
    });
  }

  print() {
    window.print();
  }

  goBack() {
    if (this.type === 'pharmacy') {
      this.router.navigate(['/pharmacy/orders']);
    } else if (this.type === 'labtest') {
      this.router.navigate(['/lab-test/my-bookings']);
    } else {
      this.router.navigate(['/consultation/my-appointments']);
    }
  }
}
