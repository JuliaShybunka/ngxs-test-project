import { CanActivate, CanActivateChild, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authorizationService: AuthorizationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authorizationService.isLogetIn()) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            });
            return false;
        }
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }
}
