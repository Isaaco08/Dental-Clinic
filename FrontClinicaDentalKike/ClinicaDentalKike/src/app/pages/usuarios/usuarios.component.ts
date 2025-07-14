import { Component, computed, signal } from '@angular/core';
import { Usuario } from '../../model/usuarios'
import { JsonPipe } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  public Titulo = 'Administración de Usuarios';
  public Usuarios = signal<Usuario[]>([]);
  public usuarioAutenticadoId: string | null = null; // Variable para almacenar el ID del usuario autenticado
  public usuariosPorPagina = 4;
  public paginaActual = signal(1);

  // Métodos paginación
  public usuariosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.usuariosPorPagina;
    const fin = inicio + this.usuariosPorPagina;
    return this.Usuarios().slice(inicio, fin);
  });

  public totalPaginas = computed(() => {
    return Math.ceil(this.Usuarios().length / this.usuariosPorPagina);
  });

  public cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }


  public nuevoUsuario = {
    UsuarioId: '',
    Nombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Contrasena: '',
    TipoDeUsuario: '',
  };

  constructor(private http: HttpClient, private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['/unauthorized']);
    }
    this.usuarioAutenticadoId = localStorage.getItem('Usuario'); // Obtener el ID del usuario autenticado
    this.getUsuarios();
  };

  public validaAcceso() {
    if (String(localStorage.getItem('TipoDeUsuario')) === "Doctor" || String(localStorage.getItem('TipoDeUsuario')) === "Recepcionista") {
      return true;
    }
    return false;
  };

  public getUsuarios() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/usuario/listar', cuerpo, { headers: encabezados })
    .subscribe((Usuario) => {
      const arr = Usuario as Usuario[];
      arr.forEach((Usuario) => {
        if (Usuario.UsuarioId) {
          this.agregarUsuarioALaSenial(Usuario);
        }
        if (Usuario.Token) {
          localStorage.setItem('Token', String(Usuario.Token));
        }
    });
      console.log(typeof(arr));
    });
  };
  
  public agregarUsuarioALaSenial(usuario: Usuario) {
      this.Usuarios.update((Usuario) => [...Usuario, usuario]);
  };

  public agregarUsuario() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');
    
    const nuevoUsuario = {
      UsuarioId: this.nuevoUsuario.UsuarioId,
      Nombre: this.nuevoUsuario.Nombre,
      PrimerApellido: this.nuevoUsuario.PrimerApellido,
      SegundoApellido: this.nuevoUsuario.SegundoApellido,
      Contrasena: this.nuevoUsuario.Contrasena,
      TipoDeUsuario: this.nuevoUsuario.TipoDeUsuario,
      UsuarioIdAuditoria: usuarioIdAuditoria // Añade el ID del usuario autenticado
    };

    this.http.post('http://localhost/usuario', nuevoUsuario, { headers: encabezados }).subscribe((usuarioCreado) => {
        const arr = usuarioCreado as Usuario[];
        arr.forEach((Usuario) => {
          if (Usuario.UsuarioId) {
            this.agregarUsuarioALaSenial(usuarioCreado as Usuario);
          }
          if (Usuario.Token) {
            localStorage.setItem('Token', String(Usuario.Token));
          }
        this.limpiarFormulario();
        });
      });
  };

  public modificarUsuario(Id: any, form: any) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    const validUserTypes = ['Doctor', 'Recepcionista', 'Paciente'];
    let tipoDeUsuario = form.value.TipoDeUsuario;
  
    if (!validUserTypes.includes(tipoDeUsuario)) {
      console.error(`Tipo de usuario inválido: ${tipoDeUsuario}`);
      return;
    }

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');
  
    let cuerpo = {
      Nombre: form.value.Nombre,
      PrimerApellido: form.value.PrimerApellido,
      SegundoApellido: form.value.SegundoApellido,
      TipoDeUsuario: tipoDeUsuario,
      UsuarioIdAuditoria: usuarioIdAuditoria // Añade el ID del usuario autenticado
    };
  
    this.http.put('http://localhost/usuario/' + Id, cuerpo, { headers: encabezados })
      .subscribe(() => {
        this.Usuarios.update((Usuario) => {
          return Usuario.map((Usuario) => {
            if (Usuario.UsuarioId === Id) {
              return { ...Usuario, ...cuerpo };
            }
            return Usuario;
          });
        });
      });
  }  

  public borrarUsuario(Id: any) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    // If para evitar que el usuario se elimine a sí mismo
    if(this.usuarioAutenticadoId != Id){
      // Obtén el ID del usuario autenticado desde localStorage
      const usuarioIdAuditoria = localStorage.getItem('Usuario');

      let cuerpo = {
        UsuarioIdAuditoria: usuarioIdAuditoria // Incluye el ID del usuario que está realizando la acción
      };
      this.http.delete('http://localhost/usuario/' + Id, { headers: encabezados, body: cuerpo }).subscribe(() => {
        this.Usuarios.update((Usuario) => Usuario.filter((Usuario) => Usuario.UsuarioId !== Id));
      });
    } else {
      return
    }
  };

  public limpiarFormulario() {
    this.nuevoUsuario = {
      UsuarioId: '',
      Nombre: '',
      PrimerApellido: '',
      SegundoApellido: '',
      Contrasena: '',
      TipoDeUsuario: ''
    };
  }

}
