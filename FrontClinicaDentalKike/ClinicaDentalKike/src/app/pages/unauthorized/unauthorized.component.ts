import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  constructor(private router: Router) { }

  irInicio() {
    // Redireccionar a la ruta raíz 
    this.router.navigate(['/inicio-sesion']);
  }
}
