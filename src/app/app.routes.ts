import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupLoginComponent } from './components/signup-login/signup-login.component';
import { UserDashComponent } from './components/user-dash/user-dash.component';
import { userguardGuard } from './guard/userguard.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProdListTypeComponent } from './components/prod-list-type/prod-list-type.component';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    { path: 'home', component: HomeComponent},

    {
        path: 'products',
        component: ProductListComponent
    },

    {
        path: 'products/:id',
        component: ProductDetailsComponent
    },

    { path: 'product/:type', component: ProdListTypeComponent},

   
    {
        path: 'cart',
        component: CartComponent
    },

    {
        path: 'auth-page',
        component: SignupLoginComponent,
        canActivate: [userguardGuard]
    },

    {
        path:'',
        component: LayoutComponent,
        canActivate: [userguardGuard],
        children: [{
            path: 'dashboard',
            component: UserDashComponent,
            children: [
                        { path: 'profile', component: ProfileComponent},
                        { path: 'orders', component: OrdersComponent},
                        { path: 'settings', component: SettingsComponent},
            ]
        },

    ]
    },
    { path: "**", component: PageNotFoundComponent}
];
