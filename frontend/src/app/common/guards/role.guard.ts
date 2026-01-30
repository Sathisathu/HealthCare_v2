import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, filter, map, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const expectedRole = route.data['role'];

        return this.authService.isInitialized$.pipe(
            filter(initialized => initialized),
            take(1),
            map(() => {
                const user = this.authService.currentUserValue;
                if (user && user.role === expectedRole) {
                    return true;
                }

                if (!user) {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                } else {
                    this.router.navigate(['/']); // Redirect to home if unauthorized
                }
                return false;
            })
        );
    }
}
