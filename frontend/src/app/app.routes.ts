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
import { LabTestListComponent } from './lab-test/components/lab-test-list/lab-test-list.component';
import { LabBookingWizardComponent } from './lab-test/components/lab-booking-wizard/lab-booking-wizard.component';
import { MyLabBookingsComponent } from './lab-test/components/my-lab-bookings/my-lab-bookings.component';
import { LabResultViewComponent } from './lab-test/components/lab-result-view/lab-result-view.component';
import { LabAdminDashboardComponent } from './lab-test/components/lab-admin-dashboard/lab-admin-dashboard.component';
import { LabAdminLayoutComponent } from './lab-test/layouts/lab-admin-layout/lab-admin-layout.component';
import { BloodVolunteerComponent } from './blood-donation/components/blood-volunteer/blood-volunteer.component';
import { BloodbankAdminDashboardComponent } from './blood-donation/components/bloodbank-admin-dashboard/bloodbank-admin-dashboard.component';
import { BloodbankAdminLayoutComponent } from './blood-donation/layouts/bloodbank-admin-layout/bloodbank-admin-layout.component';
import { LoginComponent } from './common/components/login/login.component';
import { DoctorLoginComponent } from './common/components/doctor-login/doctor-login.component';
import { AdminLoginComponent } from './common/components/admin-login/admin-login.component';
import { RegisterComponent } from './common/components/register/register.component';
import { AuthGuard } from './common/guards/auth.guard';
import { RoleGuard } from './common/guards/role.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'doctor-login', component: DoctorLoginComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'register', component: RegisterComponent },

    // 1. Main Dashboard (Exact Root Match)
    {
        path: '',
        component: MainLayoutComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
        children: [
            { path: '', component: UserDashboardComponent },
        ]
    },
    // 2. Feature Modules - Prefix Match
    {
        path: '',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
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

            // Lab Test
            { path: 'lab-test', component: LabTestListComponent },
            { path: 'lab-test/book/:testName', component: LabBookingWizardComponent },
            { path: 'lab-test/my-bookings', component: MyLabBookingsComponent },
            { path: 'lab-test/result/:bookingId', component: LabResultViewComponent },

            // Blood Donation
            { path: 'blood-donation', component: BloodVolunteerComponent },
        ]
    },
    // 3. Doctor Portal
    {
        path: 'doctor',
        component: DoctorLayoutComponent,
        canActivate: [RoleGuard],
        data: { role: 'DOCTOR' },
        children: [
            { path: 'dashboard', component: DoctorDashboardComponent },
            { path: 'dashboard/:id', component: DoctorDashboardComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' },
        children: [
            { path: '', component: AdminDashboardComponent },
        ]
    },
    {
        path: 'lab-admin',
        component: LabAdminLayoutComponent,
        canActivate: [RoleGuard],
        data: { role: 'LAB_ADMIN' },
        children: [
            { path: 'dashboard', component: LabAdminDashboardComponent },
        ]
    },
    {
        path: 'bloodbank-admin',
        component: BloodbankAdminLayoutComponent,
        canActivate: [RoleGuard],
        data: { role: 'BLOOD_BANK_ADMIN' },
        children: [
            { path: 'dashboard', component: BloodbankAdminDashboardComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
