import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, filter, map, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isInitialized$.pipe(
            filter(initialized => initialized),
            take(1),
            map(() => {
                if (this.authService.isLoggedIn()) {
                    return true;
                }
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            })
        );
    }
}
