import { Component, computed, signal } from '@angular/core';
import { Tratamiento } from '../../model/tratamientos'
import { JsonPipe } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css'
})
export class TratamientosComponent {
  public Titulo = 'Administración de Tratamientos';
  public Tratamientos = signal<Tratamiento[]>([]);

  public descripcionTratamiento: String = '';
  public tratamientoId: String = '';

  public tratamientosPorPagina = 4;
  public paginaActual = signal(1);

  public tratamientosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.tratamientosPorPagina;
    const fin = inicio + this.tratamientosPorPagina;
    return this.Tratamientos().slice(inicio, fin);
  });

  public totalPaginas = computed(() => {
    return Math.ceil(this.Tratamientos().length / this.tratamientosPorPagina);
  });

  public cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }


  constructor(private http: HttpClient, private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['/unauthorized']);
    }
    this.getTratamientos();
  };

  public validaAcceso() {
    if (String(localStorage.getItem('TipoDeUsuario')) === "Doctor" || String(localStorage.getItem('TipoDeUsuario')) === "Recepcionista") {
      return true;
    }
    return false;
  };

  public getTratamientos() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/tratamiento/listar', cuerpo, { headers: encabezados })
    .subscribe((Tratamiento) => {
      const arr = Tratamiento as Tratamiento[];
      arr.forEach((Tratamiento) => {
        if (Tratamiento.TratamientoId) {
          this.agregarTratamientoALaSenial(Tratamiento);
        }
        if (Tratamiento.Token) {
          localStorage.setItem('Token', String(Tratamiento.Token));
        }
      });
      console.log(typeof(arr));
    });
  };
  
  public agregarTratamientoALaSenial(tratamiento: Tratamiento) {
      this.Tratamientos.update((Tratamiento) => [...Tratamiento, tratamiento]);
  };

  agregarTratamiento() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    const nuevoTratamiento = {
      DescripcionDeTratamiento: this.descripcionTratamiento,
      UsuarioIdAuditoria: usuarioIdAuditoria // Añade el ID del usuario autenticado
    };

    this.http.post('http://localhost/tratamiento', nuevoTratamiento, { headers: encabezados })
      .subscribe((tratamientoCreado) => {
        const arr = tratamientoCreado as Tratamiento[];
        arr.forEach((Tratamiento) => {
          if (Tratamiento.TratamientoId) {
            this.agregarTratamientoALaSenial(tratamientoCreado as Tratamiento);
          }
          if (Tratamiento.Token) {
            localStorage.setItem('Token', String(Tratamiento.Token));
          }
        });
        this.descripcionTratamiento = ''; // Limpia el input después de agregar el tratamiento
      });
  };

  public modificarTratamiento(Id: any, event:  Event) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    let tag = event.target as HTMLInputElement
    let cuerpo = {
      DescripcionDeTratamiento: tag.value,
      UsuarioIdAuditoria: usuarioIdAuditoria
    }
    this.http.put('http://localhost/tratamiento/' + Id, cuerpo, { headers: encabezados })
    .subscribe(() => {
      this.Tratamientos.update((Tratamiento) => {
        return Tratamiento.map((Tratamiento) => {
          if (Tratamiento.TratamientoId === Id) {
            return {...Tratamiento, ...cuerpo};
          }
          return Tratamiento;
        });
      });
    });
  };

  public borrarTratamiento(Id: any) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    let cuerpo = {
      UsuarioIdAuditoria: usuarioIdAuditoria // Incluye el ID del usuario que está realizando la acción
    };
    
    this.http.delete('http://localhost/tratamiento/' + Id, { headers: encabezados, body: cuerpo }).subscribe(() => {
      this.Tratamientos.update((Tratamiento) => Tratamiento.filter((Tratamiento) => Tratamiento.TratamientoId !== Id));
    });
  };
}
