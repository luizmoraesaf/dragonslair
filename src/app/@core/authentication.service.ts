import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public isAuthenticated = new BehaviorSubject(false);

    constructor() { }

    public authenticate(email: String, password: String): boolean {
        if (email === 'admin@southsystem.com' && password === 'senha123') {
            // Emite evento avisando que está autenticado
            this.isAuthenticated.next(true);
            // Autentica
            return true;
        } else {
            // Emite evento avisando que não está autenticado
            this.isAuthenticated.next(false);
            // Não autentica
            return false;
        }
    }

}