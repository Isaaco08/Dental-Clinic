import { Component, signal, effect, computed } from '@angular/core';
import { Cita } from '../../model/citas';
import { Usuario } from '../../model/usuarios';
import { Tratamiento } from '../../model/tratamientos';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpedienteDePaciente } from '../../model/expedientes';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  public Titulo = 'Administración de Citas';
  public Citas = signal<Cita[]>([]);
  public Usuarios = signal<Usuario[]>([]);
  public Tratamientos = signal<Tratamiento[]>([]);

  formatoFecha = 'dd/MM/yyyy'; // Define el formato deseado aquí

  public citasPorPagina = 4;
  public paginaActual = signal(1);

  public citasPaginadas = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.citasPorPagina;
    const fin = inicio + this.citasPorPagina;
    return this.Citas().slice(inicio, fin);
  });

  public totalPaginas = computed(() => {
    return Math.ceil(this.Citas().length / this.citasPorPagina);
  });

  public cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }



  public nuevaCita = {
    FechaDeCita: '',
    UsuarioId: '',
    TratamientoId: '',
    DescripcionDeCita: ''
  };

  constructor(private http: HttpClient, private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['/unauthorized']);
    }
    this.getCitas();
    this.getPacientes();
    this.getTratamientos();
  };

  public validaAcceso() {
    if (String(localStorage.getItem('TipoDeUsuario')) === "Doctor" || String(localStorage.getItem('TipoDeUsuario')) === "Recepcionista") {
      return true;
    }
    return false;
  };

  public getCitas() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    let cuerpo = {};
    this.http.post('http://localhost/cita/listar', cuerpo, { headers: encabezados })
      .subscribe((citas) => {
        const arr = citas as Cita[];
        arr.forEach((Cita) => {
        if (Cita.CitaId) {
          this.agregarCitaALaSenial(Cita);
        }
        if (Cita.Token) {
          localStorage.setItem('Token', String(Cita.Token));
        }
      });
      console.log(typeof(arr));
      });
  }

  public agregarUsuarioALaSenial(usuario: Usuario) {
    this.Usuarios.update((Usuario) => [...Usuario, usuario]);
  };

  public agregarCitaALaSenial(cita: Cita) {
    this.Citas.update((Cita) => [...Cita, cita]);
  };

  public agregarTratamientoALaSenial(tratamiento: Tratamiento) {
    this.Tratamientos.update((Tratamiento) => [...Tratamiento, tratamiento]);
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

  public agregarCita() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    const nuevaCita = {
      FechaDeCita: new Date(this.nuevaCita.FechaDeCita).toISOString(),
      UsuarioId: this.nuevaCita.UsuarioId,
      TratamientoId: Number(this.nuevaCita.TratamientoId),
      DescripcionDeCita: this.nuevaCita.DescripcionDeCita,
      UsuarioIdAuditoria: usuarioIdAuditoria // Añade el ID del usuario autenticado
    };

    this.http.post('http://localhost/cita', nuevaCita, { headers: encabezados })
      .subscribe((citaCreada) => {
        const arr = citaCreada as Cita[];
        arr.forEach((Cita) => {
          if (Cita.CitaId) {
            this.agregarCitaALaSenial(citaCreada as Cita);
          }
          if (Cita.Token) {
            localStorage.setItem('Token', String(Cita.Token));
          }
        });
        this.limpiarFormulario();
      });
  }

  public modificarCita(Id: any, form: any) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');
    
    const cuerpo = {
      DescripcionDeCita: form.value.DescripcionDeCita,
      FechaDeCita: form.value.FechaDeCita,
      UsuarioId: form.value.UsuarioId,
      TratamientoId: form.value.TratamientoId,  // Mantener como string
      UsuarioIdAuditoria: usuarioIdAuditoria
    };
  
    this.http.put('http://localhost/cita/' + Id, 
      {
        ...cuerpo,
        TratamientoId: Number(form.value.TratamientoId)  // Convertir a número solo para el backend
      },
      { headers: encabezados }  // Agregar los headers aquí
    )
    .subscribe(() => {
      this.Citas.update((citas) => {
        return citas.map((cita) => {
          if (cita.CitaId === Id) {
            return { ...cita, ...cuerpo };
          }
          return cita;
        });
      });
      this.getPacientes();  
      this.getTratamientos();  
    });
  }

  public borrarCita(Id: any) {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });

    // Obtén el ID del usuario autenticado desde localStorage
    const usuarioIdAuditoria = localStorage.getItem('Usuario');

    let cuerpo = {
      UsuarioIdAuditoria: usuarioIdAuditoria // Incluye el ID del usuario que está realizando la acción
    };

    this.http.delete('http://localhost/cita/' + Id, { headers: encabezados, body: cuerpo }).subscribe(() => {
      this.Citas.update((citas) => citas.filter((cita) => cita.CitaId !== Id));
    });
  }

  public limpiarFormulario() {
    this.nuevaCita = {
      FechaDeCita: '',
      UsuarioId: '',
      TratamientoId: '',
      DescripcionDeCita: ''
    };
  }

  public crearPDF() {
    const doc = new jsPDF();
  
    // Obtener citas desde la señal
    const appointments = this.Citas();
  
    // Encabezado
    doc.setFontSize(20);
    doc.setTextColor(40, 116, 166);
    doc.text('Clínica Dental Kike', 105, 20, { align: 'center' });
  
    // Información general
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Reporte de Calendarización de Citas', 105, 30, { align: 'center' });
    doc.text('Fecha de generación: ' + new Date().toLocaleDateString('es-ES'), 105, 40, { align: 'center' });
  
    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(40, 116, 166);
    doc.line(20, 45, 190, 45);
  
    // Espacio
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Citas Programadas:', 20, 55);
  
    // Tabla de citas
    let startY = 65;
    doc.setFontSize(12);
    doc.setFillColor(40, 116, 166);
    doc.setTextColor(255);
    doc.rect(20, startY, 170, 10, 'F'); // Fila de encabezado
  
    doc.text('Fecha', 25, startY + 7);
    doc.text('Paciente', 75, startY + 7);
    doc.text('Tratamiento', 125, startY + 7);
  
    startY += 15;
    doc.setTextColor(0); // Restablecer color del texto
  
    appointments.forEach((appointment, index) => {
      if (startY > 270) { // Si la página está llena, crear una nueva
        doc.addPage();
        startY = 20;
  
        // Fila de encabezado en la nueva página
        doc.setFillColor(40, 116, 166);
        doc.setTextColor(255);
        doc.rect(20, startY, 170, 10, 'F');
        doc.text('Fecha', 25, startY + 7);
        doc.text('Paciente', 75, startY + 7);
        doc.text('Tratamiento', 125, startY + 7);
        startY += 15;
        doc.setTextColor(0); // Restablecer color del texto
      }
  
      // Formatear la fecha de la cita
      const fechaFormateada = new Date(appointment.FechaDeCita).toLocaleDateString('es-ES');
  
      // Ajustar el texto largo en varias líneas
      const nombrePaciente = `${appointment.Usuario?.Nombre || ''} ${appointment.Usuario?.PrimerApellido || ''}`;
      const descripcionTratamiento = appointment.Tratamiento?.DescripcionDeTratamiento || '';
  
      // Dividir el texto en múltiples líneas
      const tratamientoLines = doc.splitTextToSize(String(descripcionTratamiento), 60); // ancho máximo permitido para el texto
  
      // Mostrar los datos en la tabla
      doc.text(fechaFormateada, 25, startY);
      doc.text(nombrePaciente, 75, startY);
      
      // Ajustar la posición vertical para el tratamiento
      let currentY = startY;
      tratamientoLines.forEach((line: any) => {
        doc.text(line, 125, currentY);
        currentY += 10; // Ajustar el espaciado entre líneas según sea necesario
      });
  
      // Dibujar línea divisoria debajo de la fila de datos
      doc.setLineWidth(0.5);
      doc.setDrawColor(40, 116, 166);
      doc.line(20, currentY + 5, 190, currentY + 5);
  
      startY = currentY + 10; // Actualizar la posición para la siguiente cita
    });
  
    // Pie de página
    doc.setLineWidth(0.5);
    doc.setDrawColor(40, 116, 166);
    doc.line(20, 290, 190, 290);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('© 2024 Clínica Dental Kike. Todos los derechos reservados.', 105, 295, { align: 'center' });
  
    // Guardar el documento
    doc.save("calendarizacion_citas.pdf");
}

  
  
  
}
