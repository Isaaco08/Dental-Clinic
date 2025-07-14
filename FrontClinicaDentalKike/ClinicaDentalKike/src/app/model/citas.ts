import { Tratamiento } from "./tratamientos";
import { Usuario } from "./usuarios";

export interface Cita {
    CitaId: String;
    FechaDeCita : Date;
    UsuarioId: String;
    TratamientoId: String;
    DescripcionDeCita: String;
    Token?: String
    Usuario?: Usuario;  // Relación con Usuario
    Tratamiento?: Tratamiento;  // Relación con Tratamiento
}