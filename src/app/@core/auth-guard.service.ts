import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    /**
     * Valida se a rota é válida de acordo com a permissão necessária para acessar.
     */
    canActivate(route: ActivatedRouteSnapshot) {
        if (this.authService.isAuthenticated.value) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
