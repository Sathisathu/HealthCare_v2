import { Routes } from '@angular/router';
import { ProductListComponent } from './components/pharmacy/product-list/product-list.component';
import { CartComponent } from './components/pharmacy/cart/cart.component';
import { CheckoutComponent } from './components/pharmacy/checkout/checkout.component';
import { AdminDashboardComponent } from './components/pharmacy/admin-dashboard/admin-dashboard.component';

import { OrdersComponent } from './components/pharmacy/orders/orders.component';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: '', component: ProductListComponent },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'orders', component: OrdersComponent },
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
