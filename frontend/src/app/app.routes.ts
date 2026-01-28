import { Routes } from '@angular/router';
import { ProductListComponent } from './pharmacy/components/product-list/product-list.component';
import { CartComponent } from './pharmacy/components/cart/cart.component';
import { CheckoutComponent } from './pharmacy/components/checkout/checkout.component';
import { AdminDashboardComponent } from './pharmacy/components/admin-dashboard/admin-dashboard.component';

import { OrdersComponent } from './pharmacy/components/orders/orders.component';

import { UserLayoutComponent } from './pharmacy/layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './pharmacy/layouts/admin-layout/admin-layout.component';

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
