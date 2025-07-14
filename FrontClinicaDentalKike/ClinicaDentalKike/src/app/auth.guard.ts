import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const tipoDeUsuario = localStorage.getItem('TipoDeUsuario');

    if (tipoDeUsuario === 'Doctor' || tipoDeUsuario === 'Recepcionista') {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
