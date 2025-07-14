import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Payload } from '../../model/payload';


@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  public Usuario: String = '';
  public Contrasena: String = '';
  public mensajeError: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
  };

  public Autenticar() {
    let cuerpo = {
      UsuarioId: this.Usuario,
      Contrasena: this.Contrasena
    };

    localStorage.setItem('Usuario', String(this.Usuario));

    this.http.post('http://localhost/usuario/autenticar', cuerpo).subscribe((token) => {
      localStorage.setItem('Token', String(token));
      const encabezados = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
      });
      this.http.post('http://localhost/usuario/validarToken', {}, { headers: encabezados }).subscribe((token) => {
        const datos = token as Payload;

        // Verificar si TipoDeUsuario es undefined
        if (datos.TipoDeUsuario === undefined) {
          alert("Contraseña incorrecta");
          this.limpiarDatosAutenticacion(); // Limpiar los datos del localStorage
          this.Contrasena = '';
        } else {
          localStorage.setItem('TipoDeUsuario', String(datos.TipoDeUsuario));
          this.router.navigate(['']);
        }
      });
    });
  }

  public Desautenticar() {
    let cuerpo = {
      UsuarioId: this.Usuario
    };
    this.http.post('http://localhost/usuario/desautenticar', cuerpo).subscribe((token) => {
      localStorage.setItem('Token', "");
      localStorage.setItem('TipoDeUsuario', "");
      localStorage.setItem('Usuario', "");
    });
    this.Usuario = '';
    this.Contrasena = '';
    this.router.navigate(['inicio-sesion']);
  }

  private limpiarDatosAutenticacion() {
    localStorage.removeItem('Token');
    localStorage.removeItem('TipoDeUsuario');
    localStorage.removeItem('Usuario');
  }
}