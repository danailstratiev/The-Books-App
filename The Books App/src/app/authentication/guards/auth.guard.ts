import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { webToken } from 'src/app/shared/constants/app.constants';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(
        private router: Router
        ){}

    canActivate(route:ActivatedRouteSnapshot): boolean {
        const userLogged = localStorage.getItem(webToken) != null;
       
        if (!userLogged === route.data.isLogged) {
            this.router.navigate(['/signin'])
        }

        if (userLogged === true && route.data.isLogged === false) {
            this.router.navigate(['/home'])
        }

        return userLogged === route.data.isLogged;
    }
}
