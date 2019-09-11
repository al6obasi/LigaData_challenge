import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isAuthorized = this.auth.isAuthorized();
        return isAuthorized;
    };
}