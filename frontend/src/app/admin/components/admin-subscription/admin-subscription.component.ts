import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../../subscription/services/subscription.service';
import { SubscriptionTransaction } from '../../../subscription/models/subscription.models';

@Component({
    selector: 'app-admin-subscription',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="admin-subs-container">
        <h2>Subscription Approvals</h2>
        
        <div class="table-responsive" *ngIf="pendingTransactions.length > 0; else noPending">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let tx of pendingTransactions">
                        <td>{{ tx.id }}</td>
                        <td>{{ tx.user.id }}</td>
                        <td>{{ tx.planName }}</td>
                        <td>{{ tx.amount | currency:'INR'}}</td>
                        <td>{{ tx.purchaseDate | date:'short' }}</td>
                        <td>
                            <button class="btn-approve" (click)="approve(tx.id)">Approve</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ng-template #noPending>
            <div class="no-data">
                <p>No pending subscription requests.</p>
            </div>
        </ng-template>

        <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;">

        <h2>Wallet Top-up Approvals</h2>
        <div class="table-responsive" *ngIf="pendingWalletTx.length > 0; else noWallet">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let tx of pendingWalletTx">
                        <td>{{ tx.id }}</td>
                        <td>{{ tx.user.id }}</td>
                        <td>{{ tx.amount | currency:'INR' }}</td>
                        <td>{{ tx.transactionDate | date:'short' }}</td>
                        <td>
                            <button class="btn-approve" (click)="approveWallet(tx.id)">Approve</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ng-template #noWallet>
             <div class="no-data">
                <p>No pending wallet top-up requests.</p>
            </div>
        </ng-template>

    </div>
  `,
    styles: [`
    .admin-subs-container {
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h2 { margin-bottom: 20px; color: #333; }
    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
    .table th { background: #f8f9fa; font-weight: 600; color: #555; }
    .btn-approve {
        padding: 8px 16px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s;
    }
    .btn-approve:hover { background: #218838; }
    .no-data { text-align: center; padding: 40px; color: #777; font-style: italic; }
  `]
})
export class AdminSubscriptionComponent implements OnInit {
    pendingTransactions: SubscriptionTransaction[] = [];

    constructor(private subService: SubscriptionService) { }

    ngOnInit() {
        this.loadPending();
        this.loadWalletPending();
    }

    loadPending() {
        this.subService.getPendingSubscriptions().subscribe({
            next: (data) => {
                this.pendingTransactions = data;
            },
            error: (err) => {
                console.error('Error fetching subscriptions', err);
                alert('Failed to load pending subscriptions. Check console for details.');
            }
        });
    }

    approve(id: number) {
        if (confirm('Are you sure you want to approve this subscription?')) {
            this.subService.approveSubscription(id).subscribe(() => {
                alert('Subscription Approved Successfully!');
                this.loadPending();
            });
        }
    }

    // Wallet Logic
    pendingWalletTx: any[] = [];

    loadWalletPending() {
        // Direct fetch for speed, ideally move to service
        fetch('http://localhost:8080/api/wallet/pending')
            .then(res => res.json())
            .then(data => this.pendingWalletTx = data)
            .catch(err => console.error(err));
    }

    approveWallet(id: number) {
        if (confirm('Approve this Top-up?')) {
            fetch(`http://localhost:8080/api/wallet/approve/${id}`, { method: 'POST' })
                .then(() => {
                    alert('Wallet Top-up Approved!');
                    this.loadWalletPending();
                });
        }
    }
}
