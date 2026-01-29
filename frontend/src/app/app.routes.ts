import { Routes } from '@angular/router';
import { ProductListComponent } from './pharmacy/components/product-list/product-list.component';
import { CartComponent } from './pharmacy/components/cart/cart.component';
import { CheckoutComponent } from './pharmacy/components/checkout/checkout.component';
import { AdminDashboardComponent } from './pharmacy/components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './common/components/user-dashboard/user-dashboard.component';
import { OrdersComponent } from './pharmacy/components/orders/orders.component';
import { UserLayoutComponent } from './pharmacy/layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './pharmacy/layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './common/layouts/main-layout/main-layout.component';
import { DoctorListComponent } from './consultation/components/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './consultation/components/doctor-details/doctor-details.component';
import { DoctorDashboardComponent } from './consultation/components/doctor-dashboard/doctor-dashboard.component';
import { MyAppointmentsComponent } from './consultation/components/my-appointments/my-appointments.component';
import { DoctorLayoutComponent } from './consultation/layouts/doctor-layout/doctor-layout.component';

export const routes: Routes = [
    // 1. Main Dashboard (Exact Root Match)
    {
        path: '',
        component: MainLayoutComponent,
        pathMatch: 'full',
        children: [
            { path: '', component: UserDashboardComponent },
        ]
    },
    // 2. Feature Modules - Prefix Match
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            // Pharmacy
            { path: 'pharmacy', component: ProductListComponent },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'orders', component: OrdersComponent },

            // Consultation
            { path: 'consultation', component: DoctorListComponent },
            { path: 'consultation/doctor/:id', component: DoctorDetailsComponent },
            { path: 'consultation/my-appointments', component: MyAppointmentsComponent },
        ]
    },
    // 3. Doctor Portal
    {
        path: 'doctor',
        component: DoctorLayoutComponent,
        children: [
            { path: 'dashboard', component: DoctorDashboardComponent },
            { path: 'dashboard/:id', component: DoctorDashboardComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', component: AdminDashboardComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
