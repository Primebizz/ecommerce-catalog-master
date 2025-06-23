import { IModel } from './Interface/model';
import { Routes } from '@angular/router';
import { userguardGuard } from './core/guard/userguard.guard';
import { loginGuard }    from './core/guard/login.guard';

export const routes: Routes = [

  

  { path: '', redirectTo: 'home', pathMatch: 'full' },


  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home/home.component').then(m => m.HomeComponent),
    title: 'Shop for all the latest products - Home'
  },

 
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },

 
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent),
        title: `Product Details`
        
  },

  
  {
    path: 'product/:type',
    loadComponent: () =>
      import('./features/products/prod-list-type/prod-list-type.component')
        .then(m => m.ProdListTypeComponent)
  },


  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart/cart.component').then(m => m.CartComponent)
  },


  {
    path: 'product/:id/reviews',
    loadComponent: () =>
      import('./features/products/reviews/reviews.component').then(m => m.ReviewsComponent)
  },

  
  {
    path: 'auth-page',
    loadComponent: () =>
      import('./features/auth/signup-login/signup-login.component')
        .then(m => m.SignupLoginComponent),
    // canActivate: [userguardGuard]
  },

  
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/auth/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [userguardGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/auth/user-dash/user-dash.component')
            .then(m => m.UserDashComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/auth/profile/profile.component')
            .then(m => m.ProfileComponent)
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/orders/orders.component')
            .then(m => m.OrdersComponent),
        children: [{
          path: 'order-details/:id',
          loadComponent: () =>
            import('./features/orders/order-details/order-details.component')
              .then(m => m.OrderDetailsComponent)
        }]
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/auth/settings/settings.component')
            .then(m => m.SettingsComponent)
      },
      
    ]
  },
{
        path: 'checkout',
        loadComponent: () => 
          import('./features/checkout/checkout.component')
            .then(m => m.CheckoutComponent)
      },

  {
    path: '**',
    loadComponent: () =>
      import('./layouts/page-not-found/page-not-found.component')
        .then(m => m.PageNotFoundComponent)
  }
];
