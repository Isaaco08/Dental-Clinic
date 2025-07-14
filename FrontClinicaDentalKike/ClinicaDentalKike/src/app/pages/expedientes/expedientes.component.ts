import { Component, computed, signal } from '@angular/core';
import { ExpedienteDePaciente } from '../../model/expedientes';
import { Usuario } from '../../model/usuarios';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expedientes',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule],
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent {
  public Titulo = 'Administración de Expedientes';
  public Expedientes = signal<ExpedienteDePaciente[]>([]);
  public Usuarios = signal<Usuario[]>([]);

  public expedientesPorPagina = 4;
  public paginaActual = signal(1);

  public expedientesPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.expedientesPorPagina;
    const fin = inicio + this.expedientesPorPagina;
    return this.Expedientes().slice(inicio, fin);
  });

  public totalPaginas = computed(() => {
    return Math.ceil(this.Expedientes().length / this.expedientesPorPagina);
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
    this.getExpedientes();
    this.getPacientes();
  };

  public validaAcceso() {
    if (String(localStorage.getItem('TipoDeUsuario')) === "Doctor" || String(localStorage.getItem('TipoDeUsuario')) === "Recepcionista") {
      return true;
    }
    return false;
  };

  public ExpedienteFecha = {
    FechaDeExpediente: new Date() // Suponiendo que obtienes esta fecha de algún lado
  };

  formatoFecha = 'dd/MM/yyyy'; // Define el formato deseado aquí

  public nuevoExpediente: ExpedienteDePaciente = {
    FechaDeExpediente: '',
    UsuarioId: '',
    DescripcionDeExpediente: ''
  };

  public agregarExpedienteALaSenial(expediente: ExpedienteDePaciente) {
    this.Expedientes.update((Expediente) => [...Expediente, expediente]);
  };

  public getExpedientes() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/expedienteDePaciente/listar', cuerpo, { headers: encabezados })
    .subscribe((ExpedienteDePaciente) => {
      const arr = ExpedienteDePaciente as ExpedienteDePaciente[];
      arr.forEach((ExpedienteDePaciente) => {
        if (ExpedienteDePaciente.ExpedienteDePacienteId) {
          this.agregarExpedienteALaSenial(ExpedienteDePaciente);
        }
        if (ExpedienteDePaciente.Token) {
          localStorage.setItem('Token', String(ExpedienteDePaciente.Token));
        }
        
      });
      console.log(typeof(arr));
    });
  };

  public agregarUsuarioALaSenial(usuario: Usuario) {
    this.Usuarios.update((Usuario) => [...Usuario, usuario]);
  };

  public getPacientes() {
    let cuerpo = {};
    this.http.get('http://localhost/paciente', cuerpo)
    .subscribe((Usuario) => {
      const arr = Usuario as Usuario[];
      arr.forEach((Usuario) => {
        this.agregarUsuarioALaSenial(Usuario);
      });
      console.log(typeof(arr));
    });
  };

  public agregarExpediente() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    const nuevoExpediente = {
      FechaDeExpediente: new Date().toISOString(), // Ajusta la fecha al formato necesario
      UsuarioId: this.nuevoExpediente.UsuarioId,
      DescripcionDeExpediente: this.nuevoExpediente.DescripcionDeExpediente,
      UsuarioIdAuditoria: usuarioIdAuditoria // Añade el ID del usuario autenticado
    };

    this.http.post('http://localhost/expedienteDePaciente', nuevoExpediente, { headers: encabezados })
      .subscribe((expedienteCreado) => {
        const arr = expedienteCreado as ExpedienteDePaciente[];
        arr.forEach((ExpedienteDePaciente) => {
          if (ExpedienteDePaciente.ExpedienteDePacienteId) {
            this.agregarExpedienteALaSenial(expedienteCreado as ExpedienteDePaciente);
          }
          if (ExpedienteDePaciente.Token) {
            localStorage.setItem('Token', String(ExpedienteDePaciente.Token));
          }
        });
        this.limpiarFormulario();
      });
  }

  public modificarExpediente(Id: any, form: any) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    const cuerpo = {
      DescripcionDeExpediente: form.value.DescripcionDeExpediente,
      UsuarioId: form.value.UsuarioId,
      UsuarioIdAuditoria: usuarioIdAuditoria
    };

    this.http.put('http://localhost/expedienteDePaciente/' + Id, cuerpo, { headers: encabezados })
      .subscribe(() => {
        this.Expedientes.update((expedientes) => {
          return expedientes.map((expediente) => {
            if (expediente.ExpedienteDePacienteId === Id) {
              return { ...expediente, ...cuerpo };
            }
            return expediente;
          });
        });
      });
  }

  public borrarExpediente(Id: any) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    let cuerpo = {
      UsuarioIdAuditoria: usuarioIdAuditoria // Incluye el ID del usuario que está realizando la acción
    };

    this.http.delete('http://localhost/expedienteDePaciente/' + Id, { headers: encabezados, body: cuerpo }).subscribe(() => {
      this.Expedientes.update((expedientes) => expedientes.filter((expediente) => expediente.ExpedienteDePacienteId !== Id));
    });
  }

  public limpiarFormulario() {
    this.nuevoExpediente = {
      FechaDeExpediente: '',
      UsuarioId: '',
      DescripcionDeExpediente: ''
    };
  }
}
