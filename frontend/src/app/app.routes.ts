import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { OrdersComponent } from './components/orders/orders.component';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { BookingFlowComponent } from './components/consultancy/booking-flow/booking-flow.component';
import { DoctorDashboardComponent } from './components/consultancy/doctor-dashboard/doctor-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: '', component: ProductListComponent },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'book-consultation', component: BookingFlowComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', component: AdminDashboardComponent },
            { path: 'doctor-panel', component: DoctorDashboardComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
