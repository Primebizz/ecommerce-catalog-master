import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userguardGuard: CanActivateFn = (route, state) => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('token');
    const router = inject(Router);

    // If the user is not logged in, redirect to the login page
    if (isLoggedIn !== null) {
        return true;
    }else{
        router.navigateByUrl('auth-page')
        return false
    }
};
