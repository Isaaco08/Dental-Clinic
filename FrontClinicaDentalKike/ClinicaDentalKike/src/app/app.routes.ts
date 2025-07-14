import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component'
import { TratamientosComponent } from './pages/tratamientos/tratamientos.component'
import { ExpedientesComponent } from './pages/expedientes/expedientes.component'
import { CitasComponent } from './pages/citas/citas.component'
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component'
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: 'usuario',
        component: UsuariosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tratamiento',
        component: TratamientosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'expedienteDePaciente',
        component: ExpedientesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cita',
        component: CitasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'inicio-sesion',
        component: InicioSesionComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    }
];
