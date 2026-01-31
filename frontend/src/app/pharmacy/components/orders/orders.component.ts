import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyService } from '../../services/pharmacy.service';
import { Order } from '../../models/pharmacy.models';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];
    showReceiptModal: boolean = false;
    selectedReceipt: Order | null = null;

    constructor(private api: PharmacyService, private authService: AuthService) { }

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.api.getOrders().subscribe({
            next: (data) => {
                this.orders = data.reverse();
            },
            error: (err) => console.error('Error fetching orders:', err)
        });
    }

    payForOrder(order: Order) {
        if (confirm(`Do you want to pay Rs. ${order.totalAmount} for your order?`)) {
            order.isPaying = true;
            setTimeout(() => {
                this.api.updatePaymentStatus(order.id!, 'PAID').subscribe({
                    next: () => {
                        order.isPaying = false;
                        this.loadOrders();
                        this.authService.checkSession();
                        alert('Payment Successful!');
                    },
                    error: (err) => {
                        order.isPaying = false;
                        alert('Payment failed: ' + err.message);
                    }
                });
            }, 1500);
        }
    }

    viewReceipt(order: Order) {
        this.selectedReceipt = order;
        this.showReceiptModal = true;
    }

    closeReceipt() {
        this.showReceiptModal = false;
        this.selectedReceipt = null;
    }

    downloadReceipt() {
        const element = document.getElementById('receipt-content');
        if (!element || !this.selectedReceipt) return;

        html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true,
            onclone: (clonedDoc) => {
                const actions = clonedDoc.querySelector('.modal-actions') as HTMLElement;
                if (actions) actions.style.display = 'none';
            }
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Pharmacy_Receipt_${this.selectedReceipt?.receiptUrl}.pdf`);
        });
    }
}
