import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';

export const loginGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
     // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('token');
    const router = inject(Router);

    // If the user is not logged in, redirect to the login page
    if (isLoggedIn !== null) {
        return true;
    }else{
        router.navigateByUrl('dashboard')
        return false
    }
    
};
